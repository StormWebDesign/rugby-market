import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Directories and files to exclude
const EXCLUDED = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.cache',
  'coverage',
  'version.js',
  'version.min.js',
  '.env',
  '.env.local',
  'package-lock.json',
  'yarn.lock',
]);

const VERSION_FILE = path.join(rootDir, 'src', 'data', 'version.js');

function shouldExclude(name) {
  return EXCLUDED.has(name) || name.startsWith('.');
}

function getLatestModifiedTime(dir, latestTime = 0) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (shouldExclude(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      latestTime = getLatestModifiedTime(fullPath, latestTime);
    } else if (entry.isFile()) {
      // Skip the version file itself
      if (fullPath === VERSION_FILE) continue;

      const stats = fs.statSync(fullPath);
      if (stats.mtimeMs > latestTime) {
        latestTime = stats.mtimeMs;
      }
    }
  }

  return latestTime;
}

function formatVersion(timestamp) {
  const date = new Date(timestamp);
  const yy = String(date.getFullYear()).slice(-2);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${yy}.${mm}.${dd}.${hh}${min}`;
}

function updateVersionFile(newVersion) {
  // Read existing version file to preserve history
  let existingVersions = [];

  if (fs.existsSync(VERSION_FILE)) {
    const content = fs.readFileSync(VERSION_FILE, 'utf8');
    const match = content.match(/\[[\s\S]*\]/);
    if (match) {
      try {
        existingVersions = eval(match[0]);
      } catch {
        existingVersions = [];
      }
    }
  }

  // Check if version already exists (by version number prefix)
  const versionPrefix = newVersion.split(' ')[0];
  const alreadyExists = existingVersions.some(v => v.startsWith(versionPrefix));

  if (alreadyExists) {
    console.log(`Version ${versionPrefix} already exists, skipping update.`);
    return false;
  }

  // Add new version at the beginning
  existingVersions.unshift(newVersion);

  const newContent = `export const version = [
${existingVersions.map(v => `    '${v}',`).join('\n')}
];
`;

  fs.writeFileSync(VERSION_FILE, newContent, 'utf8');
  return true;
}

// Main execution
const latestTime = getLatestModifiedTime(rootDir);
const versionString = formatVersion(latestTime);
const fullVersion = `${versionString} - Update`;

console.log(`Latest file modification: ${new Date(latestTime).toISOString()}`);
console.log(`Generated version: ${versionString}`);

const updated = updateVersionFile(fullVersion);

if (updated) {
  console.log(`Updated ${VERSION_FILE}`);
  // Stage the version file for commit
  process.exit(0);
} else {
  process.exit(0);
}

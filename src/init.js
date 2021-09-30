const fs = require('fs');
const path = require('path')
const childProcess = require('child_process')
const packagePath = path.resolve('package.json') // find relative to the place where process was started
const tsConfigPath = path.resolve('tsconfig.json');
const tolstConfig = path.resolve('tolst.config.js');


const init = () => {
    const dependencies = [
        '@tri-tolstiaka/dev-server',
        'react@17.0.2',
        'react-dom@17.0.2',
        'typescript',
        'ts-loader'
    ]
    const devDeps = [
        '@types/react',
        '@types/react-dom'
    ]
    childProcess
        .execSync(
            `npm install --save ${dependencies.join(' ')}`,
            { stdio: 'inherit' }
        )
    childProcess
        .execSync(
            `npm install --save-dev ${devDeps.join(' ')} @tri-tolstiaka/dev-server`,
            { stdio: 'inherit' }
        )

    const package = require(packagePath)
    package.scripts = package.scripts || {}
    package.scripts.tolst_help = 'npx tolst-cli --help';
    package.scripts.tolst_init = 'npx tolst-cli --init';
    package.scripts.start = 'tolst-cli --server';
    package.scripts.build = 'tolst-cli --build';
    package.scripts.prod = 'tolst-cli --prod';

    if (!fs.existsSync(tsConfigPath)) {
        const isConfig = {
            "compilerOptions": {
                "target": "es6",
                "module": "esnext",
                "lib": ["DOM", "ES2021"],
                "jsx": "react",
                "strict": true,
                "noImplicitAny": false,
                "esModuleInterop": true,
                "skipLibCheck": true,
                "forceConsistentCasingInFileNames": true,
                "moduleResolution": "node",
            },
            "exclude": [
                "node_modules",
                "**/*.test.ts",
                "**/*.test.tsx",
                "node_modules/@types/jest"
            ]
        }
        fs.writeFileSync(tsConfigPath, JSON.stringify(isConfig, null, 4))
    }
    if (!fs.existsSync(tolstConfig)) {
        fs.writeFileSync(tolstConfig, JSON.stringify({}, null, 4))
    }
    fs.writeFileSync(packagePath, JSON.stringify(package, null, 4) + '\n')
}

module.exports = init;
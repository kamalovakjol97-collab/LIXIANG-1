const fs = require('fs')
const path = require('path')

// Создаём правильный default.js для @prisma/client
const prismaClientPath = path.join(__dirname, '../node_modules/@prisma/client')
const prismaGeneratedPath = path.join(__dirname, '../node_modules/.prisma/client')

if (fs.existsSync(prismaGeneratedPath)) {
  // Создаём default.js с правильным экспортом
  const defaultJsPath = path.join(prismaClientPath, 'default.js')
  const defaultJsContent = `// Re-export everything from the generated Prisma client
const client = require('../../.prisma/client/client')
module.exports = client
`
  
  fs.writeFileSync(defaultJsPath, defaultJsContent)
  console.log('✓ Created @prisma/client/default.js')
  
  // Также обновляем index.d.ts если нужно
  const indexDtsPath = path.join(prismaClientPath, 'index.d.ts')
  if (fs.existsSync(indexDtsPath)) {
    const indexDtsContent = `export * from '../../.prisma/client/client'`
    fs.writeFileSync(indexDtsPath, indexDtsContent)
    console.log('✓ Updated @prisma/client/index.d.ts')
  }
}

const program = require('commander');
const {
  createProjectAction,
  addCompomentAction,
  addPageAndRoute
} = require('./action');


const createCommands = () => {
  console.log(program)
  console.log(program.dest)
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction);
  
  program
    .command('addcpn <name>')
    .description('add vue component, 例如：why addcpn HelloWorld [-d src/components]')
    .action((name) => {
      addCompomentAction(name, program.dest || 'src/components')
    });
  
  program
    .command('addpage <page>')
    .description('add vue page and router config, 例如：why addpage Home [-d src/pages]')
    .action((page) => {
      addPageAndRoute(page, program.dest || `src/pages/${page.toLowerCase()}`)
    })
}

module.exports = createCommands;
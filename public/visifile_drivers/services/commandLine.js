async function ls(args) {
/*
description("ls function returns current files")
base_component_id("commandLine")
hash_algorithm("SHA256")
load_once_from_file(true)
only_run_on_server(true)
*/

   // console.log("2)  Service called with args:  " + JSON.stringify(args,null,2))
    console.log("4.5 callbackFn exists")
    if (args) {
      //  console.log("*) Args = " + args.text)
    }
    var exec = require('child_process').exec;

    var execPromise = new Promise(
                        done => {
                                    exec('ls', function(error, stdout, stderr)
                                    {
                                        done(stdout)
                                    })
                                })

    var val = await execPromise
    return val
}

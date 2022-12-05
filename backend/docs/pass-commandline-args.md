## [Pass command line args to npm scripts in package.json](https://stackoverflow.com/questions/51388921/pass-command-line-args-to-npm-scripts-in-package-json)

Npm now has a built-in option to pass cli **arguments directly to scripts**. The cli arguments are stored in
environmenet
variables with prefix `npm_config_<flagname>`, and they required a very strict syntax, with the form __`--<flagname>
=<flagvalue>`__.

Example:

```bash 
"my-build": "npm run vumper %npm_config_myflag% && npm run format",
```

In the terminal, run `npm run my-build --myflag=my_value` to execute `npm run vumper my_value && npm run format`.

Note:

> To refer the environment variable in the npm script, you have to use the platform specific syntax, ie
`%npm_config_myflag%` in Windows or `$npm_config_myflag` in Linux.

UPDATE:

To **avoid risks of conflict** with the npm_config variables used to configure npm itself, just prefix your arguments
with a
unique prefix, such as the name of your app.

The potential conflict is a very common problem, which applies in many contexts: any application could use environment
variables already used by other applications; for this reason, the environment variables are usually prefixed with the
name of the application (eg NVM_HOME, JAVA_HOME). But this potential conflict is not a good reason to avoid using
environment variables. The same in my opinion applies to npm params / npm_config env vars.
The [doc](https://docs.npmjs.com/cli/v7/using-npm/config#environment-variables) does not say anything
about the risk of conflicts, implying I guess they should be managed as usual.
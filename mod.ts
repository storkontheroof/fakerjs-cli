import { faker } from "./deps.ts";
import { parse } from "https://deno.land/std@0.152.0/flags/mod.ts";


function logError(message: string, data?: unknown) {
    console.error(`%c ${message}`, 'color: red;');
    console.error(data);
}

function logWarning(message: string) {
    console.error(`%c ${message}`, 'color: yellow;');
}

function log(data: unknown) {
    console.error(`${data}`);
}

function main() {
    // Parse CLI arguments
    const args = parse(Deno.args);

    // Extract the module name, method name, and options
    const [moduleName, methodName] = args._ as [string, string];
    if (!moduleName || !methodName) {
        logError("Error: You must specify a module and a method.");

        Deno.exit(1);
    }

    // Check if the module exists on `faker`
    const module = faker[moduleName as keyof typeof faker];
    if (!module || typeof module !== "object") {
        logError(`Error: Module "${moduleName}" not found on faker. Visit https://fakerjs.dev/api/ for more info on available modules.`);
        
        Deno.exit(1);
    }

    // Check if the method exists in the module
    const method = module[methodName as keyof typeof module] as (...args: unknown[]) => unknown;
    if (typeof method !== "function") {
        logError(`Error: Method "${methodName}" not found in module "${moduleName}".`);

        const availableMethods = Object.keys(module).filter((key) => typeof module[key as unknown as keyof typeof module] === "function");
        logWarning(`Available methods in "${moduleName}":\r\n  - ${availableMethods.join("\r\n  - ")}`);

        logWarning(`Also be sure to visit https://fakerjs.dev/api/${moduleName}.html for detailed info about the available methods and how to use them.`);

        Deno.exit(1);
    }

    // Extract options directly from `args`
    const options = { ...args };
    if ('_' in options) {
        // @ts-ignore: The "_" property is added by the `parse` function and is safe to delete
        delete options._;
    }

    const hasArgs =  Object.keys(options).length;

    // Execute the method with the options
    try {
        const result = hasArgs ? method(options) : method();
        log(result);
    } catch (error) {
        logError(`Error: Failed to execute "faker.${moduleName}.${methodName}(${hasArgs ? JSON.stringify(options) : ''})".`, {moduleName, methodName, options, error});
        logWarning(`Visit https://fakerjs.dev/api/${moduleName}.html for detailed info about the available methods and how to use them.`);
    }
}

// Run the CLI if executed directly
if (import.meta.main) {
    main();
}
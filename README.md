# lipsum/lipsum/README.md

# FakerJS CLI Utility

This is a command-line utility around the FakerJS library.

## Installation

To use it, you need to have Deno installed on your machine. You can install Deno by following the instructions on the [Deno website](https://deno.land/).

## Usage

To generate Faker text, this is the structure of how to execute the it:
```
deno run --allow-read --allow-write mod.ts <module> <method> <any-number-of-args>
```

### Example

To generate between 5 and 10 paragraphs or Lorem Ipsum text, you would run the following:

```
deno run --allow-read --allow-write mod.ts lorem paragraphs --min 5 --max 10
```

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
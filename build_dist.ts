import { transform as estransform, stop as esstop } from "https://deno.land/x/esbuild/mod.js"
import { bundle } from "https://deno.land/x/emit/mod.ts"

let t0 = performance.now(), t1: number
const
	entrypoint = "./src/mod.ts",
	outfile = "./dist/mod.min.js",
	bundled = await bundle(entrypoint),
	bundled_minified = await estransform(bundled.code, {
		minify: true,
		treeShaking: true,
		drop: ["debugger", "console"],
		format: "esm",
		target: "esnext",
		define: {},
	})
esstop()
t1 = performance.now()
Deno.writeTextFileSync(outfile, bundled_minified.code)
console.log("execution time:", t1 - t0, "ms")
console.log("dist binary size:", Deno.statSync(outfile).size / 1024, "kb")

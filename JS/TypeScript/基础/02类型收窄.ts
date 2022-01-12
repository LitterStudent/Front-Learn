function padLeft(padding: number | string, input: string) {
    if(typeof padding === 'number'){
        return new Array(padding+1).join(" ") + input;
    }
    return padding + input
}

function printAll(strs: string | string[] | null | boolean) {
    if (typeof strs === "object") {
      for (const s of strs) {
            // Object is possibly 'null'.
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    } else {
        console.log(strs);
      // do nothing
    }
  }
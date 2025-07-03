// fetchAPI.js

async function json_func() {
  try {
    let result = await fetch("http://localhost:3000/post/9b19", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: "9b19", title: "fetch", author: "test" }),
    });
    let resolve = result.json();
    console.log(result);

    let promise = await fetch("http://localhost:3000/post");
    resolve = await promise.json();
    console.log("결과=> ", resolve);
  } catch (err) {
    console.log(err);
  }
}

json_func();

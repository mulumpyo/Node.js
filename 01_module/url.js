// url.js

const url = new URL(
  "https://user:pass@sum.example.com:8080/a/b/c?query=name&num=1#node"
);

console.log(url.href);
console.log(url.searchParams.get("query"));
console.log(url.searchParams.get("num"));

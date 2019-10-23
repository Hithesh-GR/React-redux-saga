var demo = { a: 5, b: 2 };
// var arr=[];
// arr.push(demo);
// console.log("arr",arr);

// var counter = 0;

// // for (const iterator of arr) {
// //     counter++;
// //     if (counter > 1) {
// //         return false;
// //     }
// arr.forEach((a)=>{
//     console.log(a);
// })
   
//     // console.log("counter", counter + " " + iterator.a);

for (const key in demo) {
    if (demo.hasOwnProperty(key)) {
        const element = demo[key];
        console.log("print---->",element);
    }
}


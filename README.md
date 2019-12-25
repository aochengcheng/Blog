# Blog
尝试写一点前端的文章，记录个人状况
> 基本数据类型有哪几种？ null是对象吗？ 值类型和引用类型存储的区别。

+ 原始类型有6种：
  + Undefined
  + null
  + bool
  + string
  + number
  + Symbol (ES6)
+ typeof null 返回object 但是null不是对象，而是基本数据类型
+ 值类型存储在盏内存中，存储的是值
+ 引用类型存储在堆内存中，存储的是地址。当把一个对象赋值给另外一个变量时，赋值的是地址，指向同一块内存空间，当其中一个对象改变时，另一个也会改变。



> Typeof 是否正确判断类型？ instanceOf ？ instanceOf的实现原理

typeof 只会正确判断基本数据类型，但是除了null  `typeof null` 返回object

对于对象，typeof不能正确判断其类型，typeof 一个函数可以输出 function ，除此之外，输出的全是object。

如何准确判断 js 的数据类型

typeof   无法判断准确判断复杂数据类型

Instanceof  无法正确判断基本数据类型



> ### for of , for in 和 forEach,map 的区别。

- for...of循环：具有 iterator 接口，就可以用for...of循环遍历它的成员(属性值)。for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象、Generator 对象，以及字符串。for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。可以中断循环。
- for...in循环：遍历对象自身的和继承的可枚举的属性, 不能直接获取属性值。可以中断循环。
- forEach: 只能遍历数组，不能中断，没有返回值(或认为返回值是undefined)。
- map: 只能遍历数组，不能中断，返回值是修改后的数组。



> 如何判断一个变量是不是数组

- 使用 Array.isArray 判断，如果返回 true, 说明是数组
- 使用 instanceof Array 判断，如果返回true, 说明是数组
- 使用 Object.prototype.toString.call 判断，如果值是 [object Array], 说明是数组
- 通过 constructor 来判断，如果是数组，那么 `arr.constructor === Array`. (不准确，因为我们可以指定 `obj.constructor = Array`)



> call , apply 有什么区别？ call、apply、bind内部是如何实现的？

call 和 apply 的功能相同，区别在于传参的方式不一样:

- fn.call(obj, arg1, arg2, ...),调用一个函数, 具有一个指定的this值和分别地提供的参数(参数的列表)。
- fn.apply(obj, [argsArray]),调用一个函数，具有一个指定的this值，以及作为一个数组（或类数组对象）提供的参数。



> call核心：

- 将函数设为传入参数的属性
- 指定this到函数并传入给定参数执行函数
- 如果不传入参数或者参数为null，默认指向为 window / global
- 删除参数上的函数

```js
Function.prototype.call = function(context) {
  // 如果传入的第一个参数是 null/undefined，那么this指向 window/global
  // 如果第一个参数不是 null/undefined ，那么必须是一个 对象 
  
  if (!context) {
    contexgt = typeof window === 'undefined' ? global : window
  }
  
  context.fn = this   //this指向当前的函数
  let args = [...arguments].slice(1) // 截取除了第一个参数外的 其他参数
  let result = context.fn(...args)//隐式绑定,当前函数的this指向了context.
  delete context.fn
  return result
}
```



> apply :

apply的实现跟call很相似，但是要注意他们的参数，apply 的第二个参数是数组 或 类数组

```js
Function.prototype.apply = function(context, rest=[]) {
  if (!context) {
    context = typeof window === 'undefined' ? global : window
  }
  
  context.fn = this
  let result
  if (rest === undefined || rest === null) {
    result = context.fn(rest)	
  } else if (typeof rest === 'object') {
    result = context.fn(...rest)
  }
  delete context.fn
  return result
}
```



> 什么是深拷贝？ 深拷贝和浅拷贝有什么区别？

浅拷贝只是复制第一层对象，但是当对象的属性是一个引用类型时，实质赋值的是引用，当引用的值发生改变会跟随变化

深拷贝复制变量值，对于非基本类型的变量，则递归至基本类型变量后，再复制。深拷贝后的对象与原来的对象是完全隔离的，互不影响，对一个对象的修改并不会影响另一个对象。

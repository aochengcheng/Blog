
// 初始化 第一个item active


let lis = document.querySelectorAll('.list-wrap li')


align(lis[0])

lis.forEach((li, index) => {
  li.onclick = () => {
    align(li, index)
  }
})

function align(li, index = 0) {
  let idx = index + 1


  lis.forEach((li) => {
    if (li.classList.contains('active')) {
      li.classList.remove('active')
    }
  })

  li.classList.add('active')

  let left = idx * 80 - 98

  let wave = document.querySelector('#wave')
  wave.style.left = left + 'px'

  let color = li.dataset.color

  document.querySelector('body').style.background = color

  document.querySelector('.page').innerHTML = li.getAttribute('title')
}
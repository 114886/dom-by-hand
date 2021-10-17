window.dom = {
  //创建节点
  create(string) {
    const container = document.createElement('template')
    container.innerHTML = string.trim()
    return container.content.firstChild
  },

  //在节点后面新增节点
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSibling);
  },

  //用于在节点前面新增节点
  before(node, node2) {
    node.parentNode.insertBefore(node2, node)
  },

  //节点新增孩子
  append(parent, node) {
    parent.appendChild(node)
  },

  //节点新增父亲
  wrap(node, parent) {
    dom.before(node, parent)
    dom.append(parent, node)
  },

  //删除节点
  remove(node) {
    node.parentNode.removeChild(node)
    return node //防止有需要引用节点
  },

  //删除节点所有儿子
  empty(node) {
    const {
      childNodes
    } = node
    const array = []
    while (node.firstChild) {
      array.push(dom.remove(node.firstChild))
    }
    return array //防止有需要引用节点
  },

  //读写属性
  attr(node, name, value) { //重载  根据参数写不同个数 
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else if (arguments.length === 2) {
      return node.getAttribute(name)
    }
  },

  //修改节点内容
  text(node, string) { //适配
    if (arguments.length === 2) {
      if ('innerText' in node) {
        node.innerText = string
      } else {
        node.textContent = string
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerText
      } else {
        return node.textContent
      }
    }
  },

  //修改html
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },

  //修改样式
  style(node, name, value) {
    if (arguments.length === 3) {
      node.style[name] = value
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        return node.style[name]
      } else if (name instanceof Object) {
        for (let key in name) {
          node.style[key] = name[key]
        }
      }
    }
  },

  //class操作
  class: {
    add(node,className) {
      node.classList.add(className)
    },
    remove(node,className) {
      node.classList.remove(className)
    },
    has(node, className) {
      return node.classList.has(className)
    }
  }, 

  //监听事件封装
  on(node,eventName,fn) {
    node.addEventListener(eventName,fn)
  },
  off(node,eventName,fn) {
    node.removeEventListener(eventName,fn)
  },

  //查找
  find(selector,scope) {
    return (scope || document).querySelectorAll(selector)
  },
  parent(node) {//查找它的父亲
    return node.parentNode
  },
  children(node) {//查找它的儿子
    return node.children
  },
  siblings(node) {//查找它的兄弟
    return Array.from(node.parentNode.children).filter(n=>n!==node)
  },
  next(node) {//查找它的下一个节点
    let x = node.nextSibling
    while (x && x.nodeType === 3) {
      // 3 代表是文本
      x = x.nextSibling
    }
    return x
  },
  previous(node) {//查找上一个节点
    let x = node.previousSibling
    while (x && x.nodeType === 3) {
      // 3 代表是文本
      x = x.previousSibling
    }
    return x
  },
  each(nodeList,fn) {//遍历所有节点 适合统一添加样式
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null,nodeList[i])
    }
  },
  index(node) {//看看这个节点排第几
    const list = dom.children(node.parentNode)
    let i
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break
      }
    }
    return i
  }
};
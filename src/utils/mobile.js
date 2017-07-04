/**
 * 移动端适配
 */
const docEl = document.documentElement
const devicePixelRatio = window.devicePixelRatio

const getDeviceWidth = ()=>{
    let width = docEl.getBoundingClientRect().width  
    if( width / dpr > 540 ){  
        width = 540 * dpr
    }
    const rem = width / 10
    docEl.style.fontSize = rem + 'px'
    return rem
}

const isAndroid = window.navigator.appVersion.match(/android/gi)
const isIPhone = window.navigator.appVersion.match(/iphone/gi)
let dpr
if( isIPhone ){
    if( devicePixelRatio >= 3 ){                
        dpr = 3
    }else if( devicePixelRatio >= 2 ){
        dpr = 2
    } else {
        dpr = 1
    }
} else {
    dpr = 1
}
let scale = 1 / dpr

docEl.setAttribute('data-dpr', dpr)

let metaEl = document.querySelector('meta[name="viewport"]')
if( !metaEl ){
    metaEl = document.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    metaEl.setAttribute('content', 'width=device-width,initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
    if( docEl.firstElementChild ){
        docEl.firstElementChild.appendChild(metaEl)
    }else{
        var wrap = document.createElement('div')
        wrap.appendChild(metaEl)
        document.write(wrap.innerHTML)
    }
    document.write('<style>html[data-dpr="'+dpr+'"] body{font-size:'+12 * dpr + 'px}</style>')
}

let tid
window.addEventListener('resize', function() {
    clearTimeout(tid)
    tid = setTimeout(getDeviceWidth, 300)
}, false)
window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        clearTimeout(tid)
        tid = setTimeout(getDeviceWidth, 300)
    }
}, false)


getDeviceWidth()
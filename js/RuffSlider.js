/**
 * @desc Simple Slideshow based on CSS scroll-snap
 * @author Dominik Kressler
 * @version 0.0.1
 * @date 2021-04-08
 */
const RuffSlider = function(options) {
    let defaults = {
        selector: '.ruffslider',
        text: {
            de: {
                next: '»',
                prev: '«'
            },
            en: {
                next: '»',
                prev: '«'
            }
        }
    }
    const settings = {...defaults, ...options}
    const _this = this
    _this.settings = settings

    _this.lang = document.documentElement.lang.split('_')[0].toLowerCase()
    if(_this.lang != 'de') _this.lang = 'en'
    _this.text = settings.text[_this.lang]
    
    _this.goNext = function(uid){
        const target = document.querySelector('.ruffslider[data-rs-uid="'+uid+'"]')
        target.firstElementChild.scrollLeft = target.firstElementChild.scrollLeft + target.clientWidth 
    }
    _this.goPrev = function(uid){
        const target = document.querySelector('.ruffslider[data-rs-uid="'+uid+'"]')
        target.firstElementChild.scrollLeft = target.firstElementChild.scrollLeft - target.clientWidth
    }

    function createPager(instance) {
        const next = document.createElement('rs-next')
        next.innerText = _this.text.next
        next.classList.add('rsNext', 'rsCtrl')

        const prev = document.createElement('rs-prev')
        prev.innerText = _this.text.prev
        prev.classList.add('rsPrev', 'rsCtrl')

        const pager = document.createElement('rs-pager')
        pager.dataset.rsUid = instance.dataset.rsUid
        pager.classList.add('rsPager')
        pager.appendChild(prev)
        pager.appendChild(next)

        next.addEventListener('click', function() {_this.goNext(pager.dataset.rsUid)})
        prev.addEventListener('click', function() {_this.goPrev(pager.dataset.rsUid)})

        return pager
    }
   
    function init(_this){
        const instances = document.querySelectorAll(_this.settings.selector)

        for(instance of instances) {
            let uid = (instance.id) ? instance.id : Math.floor(Math.random() * new Date().getTime())
            instance.dataset.rsUid = uid

            instance.appendChild(createPager(instance))
        }
        
        return _this
    }

    _this.destroy = function() {
        const instances = document.querySelectorAll(_this.settings.selector)
        for(instance of instances) {
            instance.querySelector('.rsPager').remove()
            instance.removeAttribute('data-rs-uid')
        }
    }

    return init(_this)
}
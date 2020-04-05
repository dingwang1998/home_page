const headerEl = document.querySelector("header")
const scrollTop = document.querySelector(".scrollToTop")

window.addEventListener("scroll",()=>{
    let height = headerEl.getBoundingClientRect().height

    if(window.pageYOffset - height >0){
        if(!headerEl.classList.contains("sticky")){
            headerEl.classList.add("sticky")
        }
    }else {
        headerEl.classList.remove("sticky")
    }

    if(window.pageYOffset > 2000){
        scrollTop.style.display = "block"
    }else{
        scrollTop.style.display = "none"
    }
})


const glide = new Glide(".glide");
const captionsEl = document.querySelectorAll(".slide-caption")

glide.on(["mount.after","run.after"],()=>{
    const caption = captionsEl[glide.index];
    anime({
        targets: caption.children,
        opacity:[0,1],
        duration:"400",
        easing:"linear", 
        delay:anime.stagger(400,{start:300}),
        translateY: [anime.stagger([40,10]),0]
    });
});

glide.on("run.before",()=>{
    document.querySelectorAll(".slide-caption > *").forEach(el=>{
        el.style.opacity = 0;
    })
})

glide.mount();

const isotope = new Isotope(".cases",{
    // 一行排列
    layoutMode:"fitRows",
    itemSelector:".case-item"
})

const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click",e => {
    // 直接解构target
    let {target} = e;
    const filterOption = target.getAttribute("data-filter");
    if(filterOption){
        document.querySelectorAll(".filter-btn.active").forEach(btn=>btn.classList.remove("active"));
        target.classList.add("active")
        isotope.arrange({filter:filterOption});    
    }
})
 
const staggeringOption = {
    delay:300,
    distance:"50px",
    duration:500,
    easing:"ease-in-out",
    origin:"bottom"
};

ScrollReveal().reveal(".feature",{...staggeringOption, interval: 350});

ScrollReveal().reveal(".service-item",{...staggeringOption, interval: 350});

ScrollReveal().reveal(".data-section",{
    beforeReveal:() =>{
        anime({
            targets:".data-price .num",
            innerHTML: el=>{
                return [0 , el.innerHTML]
            },
            duration:2000,
            round:1,
            easing:"easeInExpo"
        })
    }
})

// 滚动特效
const scroll = new SmoothScroll('nav a[href*= "#"], .scrollToTop a[href*="#"]',{
    header:"header",
    offset:80
})


// 滚动关闭open
document.addEventListener("scrollStart",()=>{
    if(headerEl.classList.contains("open")){
        headerEl.classList.remove("open")
    }
})

const exploreBtnEls = document.querySelectorAll(".explore-btn");

exploreBtnEls.forEach(exploreBtnEl =>{
    exploreBtnEl.addEventListener("click",()=>{
        scroll.animateScroll(document.querySelector("#about-us"));
    });
});

// 折叠按钮
const burgerEl = document.querySelector(".burger");

burgerEl.addEventListener("click",()=>{
    headerEl.classList.toggle("open")
})

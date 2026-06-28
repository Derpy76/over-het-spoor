const tl=document.querySelector('.timeline');
  const tlOuter=document.querySelector('.timeline-outer');
  if(tl&&tlOuter){
    const updateFade=()=>{
      const canScroll=tl.scrollWidth>tl.clientWidth+2;
      const atEnd=tl.scrollLeft+tl.clientWidth>=tl.scrollWidth-2;
      tlOuter.classList.toggle('timeline-outer--can-scroll',canScroll);
      tlOuter.classList.toggle('timeline-outer--end',atEnd);
      tlOuter.classList.toggle('timeline-outer--scrolled',tl.scrollLeft>2);
    };
    new ResizeObserver(updateFade).observe(tl);
    tl.addEventListener('scroll',updateFade,{passive:true});
    updateFade();
  }

const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.14});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    const rings=document.querySelectorAll('.hero__emblem .rings circle');
    rings.forEach((c,i)=>{c.style.transformOrigin='100px 100px';c.style.transform='scale(.2)';c.style.opacity='0';
      c.style.transition=`transform .9s cubic-bezier(.2,.7,.2,1) ${i*.12+.3}s, opacity .9s ease ${i*.12+.3}s`;});
    requestAnimationFrame(()=>requestAnimationFrame(()=>{rings.forEach(c=>{c.style.transform='scale(1)';c.style.opacity='';});}));
  }

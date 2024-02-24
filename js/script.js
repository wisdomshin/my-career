//scrolla animation
$(function () {
  $('.animate').scrolla({
    mobile: true,
    once: false,
  });

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.matchMedia({
    '(min-width: 1024px)': function () {
      let list = gsap.utils.toArray('.career ul li');
      let scrollTween = gsap.to(list, {
        xPercent: -105 * (list.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.career',
          pin: true,
          scrub: 1,
          start: 'center center',
          end: '300%',
          // markers: true,
        },
      });

      // .imgBox모션
      gsap.utils.toArray('.wrap-img').forEach(function (imgBox) {
        // imgBox가 커지는 애니메이션
        gsap
          .timeline({
            scrollTrigger: {
              trigger: imgBox,
              containerAnimation: scrollTween,
              start: 'center right',
              end: 'center center',
              scrub: true,
              // markers: true,
            },
          })
          .to(
            imgBox,
            { 'clip-path': 'inset(0%)', ease: 'none', duration: 1 },
            0
          );

        gsap
          .timeline({
            scrollTrigger: {
              trigger: imgBox,
              containerAnimation: scrollTween,
              start: 'center center',
              end: 'center left',
              scrub: true,
              // markers: true,
            },
          })
          .to(
            imgBox,
            { 'clip-path': 'inset(30%)', ease: 'none', duration: 1 },
            0
          );
      });

      // .textBox모션
      gsap.utils.toArray('.wrap-text').forEach(function (textBox) {
        // textBox가 커지는 애니메이션
        gsap
          .timeline({
            scrollTrigger: {
              trigger: textBox,
              containerAnimation: scrollTween,
              start: 'center 70%',
              end: 'center 40%',
              scrub: true,
              // markers: true,
            },
          })
          .to(textBox, { opacity: '1', x: -100 }, 0);
        // textBox가 작아지는 애니메이션
        gsap
          .timeline({
            scrollTrigger: {
              trigger: textBox,
              containerAnimation: scrollTween,
              start: 'center 30%',
              end: 'center 20%',
              scrub: true,
              // markers: true,
            },
          })
          .to(textBox, { opacity: '1' }, 0);

        // counter 텍스트 변경
        gsap.utils.toArray('.num').forEach(function (text) {
          let num = text.getAttribute('data-text');
          let counter = document.querySelector('.counter .now');

          ScrollTrigger.create({
            trigger: text,
            start: '0% center',
            end: '100% center',
            scrub: true,
            containerAnimation: scrollTween,
            onEnter: (self) => (counter.innerText = num),
            onEnterBack: (self) => (counter.innerText = num),
            // markers: true,
          });
        });
      });
    },
  });
});

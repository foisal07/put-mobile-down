const slideshowImage = document.getElementById('slideshow-image');
const slideshowSources = [
  'https://media.istockphoto.com/id/1344461297/hu/vektor/hatalmas-elef%C3%A1nt-lebeg-vagy-rep%C3%BCl-l%C3%A9gg%C3%B6mbbel-%C3%A9g-%C3%A9s-felh%C5%91k-h%C3%A1tter%C3%A9vel-fantasztikus-sz%C3%BCrre%C3%A1lis.jpg?s=612x612&w=0&k=20&c=Ts8-lKcp5K2TGc8FFpE8r9WRrHDClEh55UsuvKdurS0=',
  'https://media.istockphoto.com/id/501569906/photo/abstract-futuristic-art-imagination.jpg?s=612x612&w=0&k=20&c=dtnAuWBuK-7owESkQn-J6FCXcrJbAWq_ohEAtUQDck4=',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQqzbcgxWmwJL7c1NwSpJdZErClQn-6WPELA&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7dgPABjLz-NNV8NOKpAFup_0NIVF4TPRuNQ&s',
  'https://media.istockphoto.com/id/1324035318/hu/vektor/fa-agy-emberi-fej-k%C3%B6peny-gondolat-fogalma-gondolkod%C3%A1s-rem%C3%A9ny-szabads%C3%A1g-%C3%A9s-elme-sz%C3%BCrre%C3%A1lis.jpg?s=612x612&w=0&k=20&c=fyuRxbVAY7s4i9jMzFm5O0J6ULB1Ag3MFQIohVMbZtU=',
  'https://media.istockphoto.com/id/1446872644/hu/vektor/a-k%C3%A9t-k%C3%A9k-tenger-k%C3%B6z%C3%B6tt-a-tengerparton-s%C3%A9t%C3%A1l%C3%B3-ember-illusztr%C3%A1ci%C3%B3ja-sz%C3%BCrre%C3%A1lis-absztrakt.jpg?s=612x612&w=0&k=20&c=V_T9AMExjNaPCA2ir7l0TcFAE2dMgs9im67xCGfnYL4=',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR9gTsLjew55qX4AEfWWt7ndq7mf4rOcHSiA&s',
  'https://media.istockphoto.com/id/1893527144/hu/fot%C3%B3/n%C5%91-%C3%A1ll-a-fant%C3%A1zia-t%C3%A1j.jpg?s=612x612&w=0&k=20&c=Kmq1Hv7ydO2ae0fDArCk3QQieysPDVT6KGFusuJu_0g=',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXCXBqD3pCCRoAWIm4oR1XCr3LpuFDWleOmw&s',
  'https://media.istockphoto.com/id/1312993183/hu/fot%C3%B3/b%C3%A1ln%C3%A1k-rep%C3%BClnek-az-%C3%A9gen-a-hegyekben-sz%C3%BCrre%C3%A1lis-k%C3%A9p-a-szorong%C3%A1sr%C3%B3l-%C3%A9s-az-elszigetelts%C3%A9gr%C5%91l-ez.jpg?s=1024x1024&w=is&k=20&c=JxZzfCcT1HH3STs8ey4itwyxNh9ezViJPXLSDtleNl8='
];

if (slideshowImage && slideshowSources.length) {
  slideshowImage.src = slideshowSources[0];

  // Preload the remaining images for smoother transitions.
  slideshowSources.slice(1).forEach(src => {
    const preload = new Image();
    preload.src = src;
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion && slideshowSources.length > 1) {
    let currentIndex = 0;

    setInterval(() => {
      slideshowImage.classList.add('is-fading');

      window.setTimeout(() => {
        currentIndex = (currentIndex + 1) % slideshowSources.length;
        slideshowImage.src = slideshowSources[currentIndex];
        slideshowImage.classList.remove('is-fading');
      }, 400);
    }, 6000);
  }
}

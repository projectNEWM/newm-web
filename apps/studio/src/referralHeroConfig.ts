const loadReferralHeroScript = (referralUUID: string) => {
  if (!referralUUID) {
    return;
  }

  const script = document.createElement("script");

  script.textContent = `
  !function(m,a,i,t,r,e){if(m.RH)return;r=m.RH={},r.uuid
  =t,r.loaded=0,r.base_url=i,r.queue=[],m.rht=function()
  {r.queue.push(arguments)};e=a.getElementsByTagName('script')
  [0],c=a.createElement('script');c.async=!0,c.src=
  'https://referralhero-global-code.s3.amazonaws.com/'+'production'+
  '/'+t+'.js',e.parentNode.insertBefore(c,e)}(window,document,
  'https://app.referralhero.com/','${referralUUID}');
`;

  document.body.appendChild(script);
};

export default loadReferralHeroScript;

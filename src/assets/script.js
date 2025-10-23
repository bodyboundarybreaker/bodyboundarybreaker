(function(){
  function updateTime(){
    const el = document.getElementById('utc-time');
    if(!el) return;
    const now = new Date();
    el.textContent = now.toISOString().replace('T',' ').replace('Z',' UTC');
  }

  function setBuildTime(){
    const b = document.getElementById('build-time');
    if(!b) return;
    b.textContent = new Date().toISOString();
  }

  document.addEventListener('DOMContentLoaded', function(){
    updateTime();
    setBuildTime();
    setInterval(updateTime, 1000);

    const btn = document.getElementById('greet');
    const out = document.getElementById('greeting');
    if(btn && out){
      btn.addEventListener('click', function(){
        out.textContent = 'Hello — your local assets are embedded and working.';
      });
    }
  });
})();

(function(){
  // Update local time + timezone for user's locale
  function updateLocalTime(){
    const el = document.getElementById('local-time');
    const tzEl = document.getElementById('tz');
    if(!el) return;

    const now = new Date();

    // Use Intl.DateTimeFormat for locale-aware formatting and timezone name
    const timeFormatter = new Intl.DateTimeFormat(navigator.language || undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const dateFormatter = new Intl.DateTimeFormat(navigator.language || undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });

    el.textContent = `${dateFormatter.format(now)} ${timeFormatter.format(now)}`;

    // Try to get a short timezone name (e.g., "PDT", "GMT")
    let tzName = 'UTC';
    try {
      // Some browsers support timeZoneName:'short' producing "GMT-7" / "PDT"
      const tzFormatter = new Intl.DateTimeFormat(undefined, { timeZoneName: 'short' });
      const parts = tzFormatter.formatToParts(now);
      const tzPart = parts.find(p => p.type === 'timeZoneName');
      if(tzPart && tzPart.value) tzName = tzPart.value;
      else {
        // As a fallback, use the IANA timezone returned by Intl API if available
        if (Intl.DateTimeFormat().resolvedOptions().timeZone) {
          tzName = Intl.DateTimeFormat().resolvedOptions().timeZone;
        }
      }
    } catch (e) {
      // ignore and leave tzName as fallback
      const resolved = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if(resolved) tzName = resolved;
    }

    if(tzEl){
      tzEl.textContent = tzName;
    }
  }

  function setBuildTime(){
    const b = document.getElementById('build-time');
    if(!b) return;
    b.textContent = new Date().toISOString();
  }

  document.addEventListener('DOMContentLoaded', function(){
    updateLocalTime();
    setBuildTime();
    setInterval(updateLocalTime, 1000);

    const btn = document.getElementById('greet');
    const out = document.getElementById('greeting');
    if(btn && out){
      btn.addEventListener('click', function(){
        out.textContent = 'Hello — your local assets are embedded and working.';
      });
    }
  });
})();

const http = require('http');

const leads = [
  { phone: '971509537211', salutation: 'Mrs.', firstName: 'Nrupesh' },
  { phone: '971567811362', salutation: 'Mr.', firstName: 'AHMED' },
  { phone: '971522702646', salutation: 'Mr.', firstName: 'mufaddal' },
  { phone: '447737599198', salutation: 'Mrs.', firstName: 'Khalida' },
  { phone: '971544054002', salutation: 'Miss', firstName: 'Viola' },
  { phone: '971549930102', salutation: 'Miss', firstName: 'Sumit' },
  { phone: '971524416167', salutation: '', firstName: 'banin' },
  { phone: '971562676955', salutation: '', firstName: 'Bhaskar' },
  { phone: '971527163289', salutation: 'Mrs.', firstName: 'Krish' },
  { phone: '971556847388', salutation: 'Mr.', firstName: 'Shahab' },
  { phone: '971585948550', salutation: 'Miss', firstName: 'Rodrigo' }
];

async function sendMessage(lead) {
  const salutation = lead.salutation ? lead.salutation + ' ' : '';
  const msg = `Hi ${salutation}${lead.firstName} 👋\n\nMatheesha Sarathchandra from InsuranceMarket.ae here - I'm your dedicated advisor for your health insurance inquiry!\n\nI've reviewed your profile and we have the perfect options for you. Here's what we offer:\n\n📋 BASIC PLAN - Clinic coverage only (Outpatient)\n📋 BASIC ENHANCED - Clinic coverage + Direct access to Specialists (Outpatient)\n📋 ENHANCED - Complete coverage: Clinics + Hospitals (Outpatient) + International plans\n\nTo share you the best quotations, I'd love to know:\n\n1️⃣ Are you looking for a plan within a *specific budget*?\n2️⃣ Or do you prefer coverage at *specific facilities* (clinics, hospitals, international)?\n\nOnce I know your preference, I'll send tailored quotes matching your needs!\n\nThanks,`;

  const body = JSON.stringify({ recipient: lead.phone, message: msg });
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/api/send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = http.request(options, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ phone: lead.phone, response: d }));
    });

    req.on('error', e => reject({ phone: lead.phone, error: e.message }));
    req.write(body);
    req.end();
  });
}

async function run() {
  const results = [];
  for (const lead of leads) {
    try {
      const res = await sendMessage(lead);
      results.push(res);
      console.log(`Sent to ${lead.phone}: ${res.response}`);
    } catch (e) {
      results.push(e);
      console.log(`Error sending to ${lead.phone}: ${e.error}`);
    }
    // Small delay between messages
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log('--- ALL DONE ---');
}

run();

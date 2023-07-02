document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");
  const apiKeyInput = document.getElementById("apiKey");
  const nameInput = document.getElementById("name");
  const desiredRoleInput = document.getElementById("desiredRole");
  const yearsExperienceInput = document.getElementById("yearsExperience");
  const degreeInput = document.getElementById("degree");
  const emailInput = document.getElementById("email");
  const phoneNumberInput = document.getElementById("phoneNumber");
  const jobDescription = document.getElementById("jobDescription");
  const coverLetter = document.getElementById("coverLetter");
  const loading = document.getElementById("loading");
  const error = document.getElementById("error");

  // Load saved data from localStorage
  apiKeyInput.value = localStorage.getItem('apiKey') || '';
  nameInput.value = localStorage.getItem('name') || '';
  desiredRoleInput.value = localStorage.getItem('desiredRole') || '';
  yearsExperienceInput.value = localStorage.getItem('yearsExperience') || '';
  degreeInput.value = localStorage.getItem('degree') || '';
  emailInput.value = localStorage.getItem('email') || '';
  phoneNumberInput.value = localStorage.getItem('phoneNumber') || '';
  jobDescription.value = localStorage.getItem('jobDescription') || '';

  let response;

  function sanitizeInput(input) {
    // This is a very simple sanitization function that removes anything that isn't a letter, number, space, or common punctuation
    // You may want to adjust this to suit your needs
    return input.replace(/[^a-z0-9 ,.!?]/gi, '');
  }

  generateBtn.addEventListener("click", async () => {
    try {
      loading.style.display = "block";
      error.style.display = "none";

      const apiKey = sanitizeInput(apiKeyInput.value);
      const name = sanitizeInput(nameInput.value);
      const desiredRole = sanitizeInput(desiredRoleInput.value);
      const yearsExperience = sanitizeInput(yearsExperienceInput.value);
      const degree = sanitizeInput(degreeInput.value);
      const email = sanitizeInput(emailInput.value);
      const phoneNumber = sanitizeInput(phoneNumberInput.value);
      const description = sanitizeInput(jobDescription.value);

      // Save data to localStorage
      localStorage.setItem('apiKey', apiKey);
      localStorage.setItem('name', name);
      localStorage.setItem('desiredRole', desiredRole);
      localStorage.setItem('yearsExperience', yearsExperience);
      localStorage.setItem('degree', degree);
      localStorage.setItem('email', email);
      localStorage.setItem('phoneNumber', phoneNumber);
      localStorage.setItem('jobDescription', description);

      const messages = [
        {
          'role': 'system',
          'content': 'You are a helpful assistant.'
        },
        {
          'role': 'user',
          'content': `Generate a professional cover letter for a job application based on the following information in about 300 words please:
          Name: ${name}
          Desired Role: ${desiredRole}
          Years of Experience: ${yearsExperience}
          Degree: ${degree}
          Email: ${email}
          Phone Number: ${phoneNumber}
          Job Description: ${description}`
        }
      ];

      const prompt = {
        'messages': messages
      };

      const data = {
        'apiKey': apiKey,
        'prompt': JSON.stringify(prompt),
        'maxTokens': 500,
        'temperature': 0.5,
        'topP': 1
      };

      response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        response = await response.json();
        coverLetter.value = response.choices[0].message.content;
        loading.style.display = "none";
      }

    } catch(e) {
      loading.style.display = "none";
      error.style.display = "block";
      error.textContent = e.message || 'An unexpected error occurred.';
    }
  });
});



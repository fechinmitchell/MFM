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
  const loadingBar = document.getElementById("loadingBar");

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
      loadingBar.style.display = "block"; // Show the loading bar
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

          Job Description:
          ${description}`
        }
      ];

      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          'model': 'gpt-3.5-turbo',
          'messages': messages,
          'max_tokens': 500,
          'n': 1,
                   'temperature': 0.5
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data['choices'] && data['choices'].length > 0) {
        const generatedCoverLetter = data['choices'][0]['message']['content'];
        coverLetter.value = generatedCoverLetter;
      } else {
        throw new Error('Unable to generate a cover letter. Please try again.');
      }
    } catch (error) {
      error.textContent = `An error occurred: ${error.message}`;
      error.style.display = "block";
    } finally {
      loading.style.display = "none";
      loadingBar.style.display = "none"; // Hide the loading bar
    }
  });
});


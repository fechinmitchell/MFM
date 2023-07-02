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
    const downloadBtn = document.getElementById("downloadBtn");
  
    let response;
  
    generateBtn.addEventListener("click", async () => {
      try {
        loading.style.display = "block";
        error.style.display = "none";
  
        const apiKey = apiKeyInput.value;
        const name = nameInput.value;
        const desiredRole = desiredRoleInput.value;
        const yearsExperience = yearsExperienceInput.value;
        const degree = degreeInput.value;
        const email = emailInput.value;
        const phoneNumber = phoneNumberInput.value;
        const description = jobDescription.value;
  
        const prompt = `Generate a professional cover letter for a job application based on the following information:
        Name: ${name}
        Desired Role: ${desiredRole}
        Years of Experience: ${yearsExperience}
        Degree: ${degree}
        Email: ${email}
        Phone Number: ${phoneNumber}
  
        Job Description:
        ${description}
  
        Cover Letter:\n`;
  
        response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
          mode: 'no-cors',
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
          },
          body: JSON.stringify({
            prompt: prompt,
            max_tokens: 300,
            n: 1,
            temperature: 0.5
          })
        });
  
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Invalid API key");
          } else {
            throw new Error(`Error generating cover letter (status: ${response.status}, statusText: ${response.statusText})`);
          }
        }
  
        const data = await response.json();
        const generatedText = data.choices[0].text;
        coverLetter.value = generatedText;
        downloadBtn.style.display = "block";
      } catch (e) {
        console.error(e);
  
        if (e.message === "Invalid API key") {
          error.innerText = "Error generating cover letter. Invalid API key. Please check your API key and try again.";
        } else if (e.message === "Error generating cover letter") {
          error.innerText = `Error generating cover letter (status: ${response && response.status}, statusText: ${response && response.statusText}). Please check your API key and try again.`;
        } else {
          error.innerText = "An unexpected error occurred. Please try again.";
        }
        error.style.display = "block";
      } finally {
        loading.style.display = "none";
      }
    });
  
    downloadBtn.addEventListener("click", () => {
      const pdf = new jsPDF();
      const text = coverLetter.value;
      pdf.text(text, 10, 10);
      pdf.save("Cover_Letter.pdf");
    });
  });
  
  
// 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
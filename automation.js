document.addEventListener("DOMContentLoaded", function() {
    var options = {
      strings: [
        "I am a Data Scientist.", 
        "I am a Data Analyst.", 
        "IT Automation Expert.", 
        "A Power BI Expert.", 
        "A Python Instructor.", 
        "A Freelancer."
      ],
      typeSpeed: 70,
      backSpeed: 50,
      startDelay: 1400,
      loop: true
    };
    new Typed(".typed", options);

    const buttons = document.querySelectorAll('.action .button');
    buttons.forEach((button, index) => {
      setTimeout(() => {
        button.classList.add('show');
      }, index * 700);
    });
});
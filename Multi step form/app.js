  // Initialize Lucide icons
        lucide.createIcons();

        const form = document.getElementById('signupForm');
        const submitBtn = document.getElementById('submitBtn');
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Basic UI feedback: Loading state
            const originalContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<div class="spinner"></div> <span>Processing...</span>`;

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                emailError.classList.remove('hidden');
                emailInput.classList.add('border-red-300');
                resetBtn();
                return;
            }

            // Simulate API Call
            setTimeout(() => {
                emailError.classList.add('hidden');
                emailInput.classList.remove('border-red-300');
                
                // Show success message or redirect
                submitBtn.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5"></i> <span>Success!</span>`;
                lucide.createIcons();
                
                console.log('Form Data:', Object.fromEntries(new FormData(form)));
                
                // Mock redirect after success
                setTimeout(() => {
                    resetBtn();
                }, 2000);
            }, 1200);
        });

        function resetBtn() {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Continue</span>`;
        }
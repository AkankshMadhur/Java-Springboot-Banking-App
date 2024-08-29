document.addEventListener('DOMContentLoaded', function() {
    const addBankAccountBtn = document.getElementById("addBankAccountBtn");
    const addBankAccountForm = document.getElementById("addBankAccountForm");
    const withdrawBtn = document.getElementById("withdrawBtn");
    const depositBtn = document.getElementById("depositBtn");
    const viewTransactionsBtn = document.getElementById("viewTransactionsBtn");
    const withdrawForm = document.getElementById("withdrawForm");
    const depositForm = document.getElementById("depositForm");
    const viewTransactionsForm = document.getElementById("viewTransactionsForm");

    if (addBankAccountBtn && addBankAccountForm) {
        addBankAccountBtn.addEventListener("click", function() {
            addBankAccountForm.style.display = "block";
        });

        addBankAccountForm.addEventListener('submit', handleAddBankAccountFormSubmit);
    } else {
        console.error('Error: addBankAccountBtn or addBankAccountForm not found');
    }

    function handleAddBankAccountFormSubmit(event) {
        event.preventDefault();
        const name = document.getElementById('accountHolderName').value;
        const dob = formatDate(document.getElementById('dob').value); // Format date
        const email = document.getElementById('email').value;
        const balance = parseFloat(document.getElementById('balance').value);
        const phone = document.getElementById('phoneNumber').value;
        const depositAmt=parseFloat(document.getElementById('amount').value);


        // Email validation using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Check if balance is negative
        if (balance < 0) {
            alert("Balance cannot be negative");
            return;
        }

        const age = calculateAge(dob);
        // Check if age is less than 10
        if (age < 10) {
            alert("Age must be above 10");
            return;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }




        const formData = {
            accountHolderName: name,
            dob: dob,
            email: email,
            balance: balance,
            phoneNumber: phone
        };

        if (validateForm(addBankAccountForm)) {
            addBankAccount(formData); // Call addBankAccount function if form is valid
        }
    }

    function calculateAge(dob) {
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }
        return age;
    }

    function validateForm(form) {
        const inputs = form.getElementsByTagName("input");
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];
            if (input.hasAttribute("required") && !input.value.trim()) {
                alert(`Please fill in the ${input.name} field.`);
                return false;
            }
        }
        return true;
    }

    //Clearing form
    function clearForm() {
        document.getElementById('accountHolderName').value = '';
        document.getElementById('dob').value = '';
        document.getElementById('email').value = '';
        document.getElementById('balance').value = '';
        document.getElementById('phoneNumber').value = '';
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if necessary
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if necessary
        return `${year}-${month}-${day}`;
    }

    function addBankAccount(formData) {
        fetch('http://localhost:8080/api/accounts/', { // Adjust the URL to match your backend server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create bank account');
            }
            return response.json();
        })
        .then(data => {
            console.log('Bank account created successfully:', data);
            if (addBankAccountForm && typeof addBankAccountForm.reset === 'function') {
                addBankAccountForm.reset();
            } else {
                console.error('Error resetting form: addBankAccountForm is not a valid form element');
            }
            clearForm(addBankAccountForm);
            alert("Bank Account Created Successfully");
        })
        .catch(error => {
            console.error('Error creating bank account:', error);
            alert("Failed to create bank account");
        });
    }

    // Withdraw Money
    withdrawBtn.addEventListener("click", function() {
        withdrawForm.style.display = "block";
        addBankAccountForm.style.display = "none"; // Hide add bank account form when "Withdraw" is clicked
        depositForm.style.display = "none"; // Hide deposit form when "Withdraw" is clicked
        viewTransactionsForm.style.display = "none"; // Hide view transactions form when "Withdraw" is clicked
    });

   // Withdraw Form Submission
  // Withdraw Form Submission
  // Withdraw Form Submission
  withdrawForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission behavior

      // Get the account ID and withdrawal amount from the form inputs
      const accountId = document.getElementById('withdrawAccountNo').value;
      const withdrawalAmount = parseFloat(document.getElementById('withdrawAmount').value);

      // Check if withdrawal amount is negative
      if (withdrawalAmount < 0) {
          alert("Withdrawal amount cannot be negative.");
          return; // Stop further execution
      }

      // Construct the URL with the account ID included in the path
      const withdrawalUrl = `http://localhost:8080/api/accounts/${accountId}/withdraw`;

      // Prepare the request body with the withdrawal amount
      const requestBody = {
          amount: withdrawalAmount
      };

      // Send a PUT request to the backend API to withdraw money
      fetch(withdrawalUrl, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
      })
      .then(response => {
          console.log('Response status:', response.status); // Log response status
          if (response.status === 200) {
              return response.json(); // Proceed to handle successful withdrawal
          } else if (response.status === 404) {
              throw new Error('Account not found. Please enter a valid account number.'); // Handle 404 error
          } else if (response.status === 400) {
              throw new Error('insufficient Balance.'); // Handle insufficient balance error
          } else if(response.status===500){
          throw new Error('Enter valid Amount.');
          }
          else
          {
              throw new Error('Failed to withdraw money.'); // Handle other response statuses
          }
      })
      .then(data => {
          console.log('Response data:', data); // Log response data
          document.getElementById('withdrawAccountNo').value = '';
          document.getElementById('withdrawAmount').value = '';
          alert('Money withdrawn successfully.'); // Display success message
      })
      .catch(error => {
          console.error('Error withdrawing money:', error.message); // Log and display error message
          alert(error.message); // Display error message to user
      });
  });



depositBtn.addEventListener("click", function() {
    // Show deposit form
    depositForm.style.display = "block";

    // Hide other forms
    withdrawForm.style.display = "none";
    addBankAccountForm.style.display = "none";
    viewTransactionsForm.style.display = "none";
});



    // Deposit Form Submission
    // Deposit Form Submission
   depositForm.addEventListener('submit', function(event) {
       event.preventDefault(); // Prevent the default form submission behavior

       // Get the account ID and deposit amount from the form inputs
       const accountId = document.getElementById('accountNo').value;
       const depositAmount = parseFloat(document.getElementById('amount').value);

       // Check if deposit amount is negative
       if (depositAmount < 0) {
           alert("Deposit amount cannot be negative.");
           return; // Stop further execution
       }

       // Construct the URL with the account ID included in the path
       const depositUrl = `http://localhost:8080/api/accounts/${accountId}/deposit`;

       // Prepare the request body with the deposit amount
       const requestBody = {
           amount: depositAmount
       };

       // Send a PUT request to the backend API to deposit money
       fetch(depositUrl, {
           method: 'PUT',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify(requestBody)
       })
      .then(response => {
          console.log('Response status:', response.status); // Log response status
          if (response.status === 200) {
              return response.json(); // Proceed to handle successful deposit
          } else if (response.status === 404) {
              throw new Error('Account not found. Please enter a valid account number.'); // Handle 404 error
          } else {
              throw new Error('Failed to deposit money'); // Handle other response statuses
          }
      })
      .then(data => {
          console.log('Response data:', data); // Log response data
//          depositForm.reset();
          document.getElementById('accountNo').value = '';
          document.getElementById('amount').value = '';
          alert('Money deposited successfully: '); // Display success message
      })
      .catch(error => {
          console.error('Error depositing money:', error.message); // Log and display error message
          alert(error.message); // Display error message to user
      });

   });


//View Transaction
// View Transactions
    viewTransactionsBtn.addEventListener("click", function() {
        viewTransactionsForm.style.display = "block";
        addBankAccountForm.style.display = "none"; // Hide add bank account form when "View Transactions" is clicked
        depositForm.style.display = "none"; // Hide deposit form when "View Transactions" is clicked
        withdrawForm.style.display = "none"; // Hide withdraw form when "View Transactions" is clicked
    });

    // View Transactions Form Submission
    viewTransactionsForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        const accountNo = document.getElementById('viewAccountNo').value;
        fetch(`http://localhost:8080/api/transactions/account/${accountNo}`)

            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch transaction data');
                }
                return response.json();
            })
            .then(transactions => {
                const mainContent = document.querySelector('.main-content');
                // Clear previous transaction table
                while (mainContent.firstChild) {
                    mainContent.removeChild(mainContent.firstChild);
                }
                // Create table to display transaction data
                const transactionTable = document.createElement('table');
              transactionTable.innerHTML = `
                  <tr class="transaction-table">
                      <th class="transaction-table">Date</th>
                      <th class="transaction-table">Type</th>
                      <th class="transaction-table">Amount</th>
                  </tr>
              `;

                // Populate table with transaction data and calculate total balance
                let totalBalance = 0;
                transactions.forEach(transaction => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${transaction.transactionDate}</td>
                        <td>${transaction.transactionType}</td>
                        <td>${transaction.amount}</td>
                    `;
                    transactionTable.appendChild(row);
                    if (transaction.transactionType === 'deposit') {
                        totalBalance += transaction.amount;
                    } else if (transaction.transactionType === 'withdrawal') {
                        totalBalance -= transaction.amount;
                    }
                });
                // Display total balance
                const totalRow = document.createElement('tr');
                totalRow.innerHTML = `
                    <td colspan="2">Total Balance:</td>
                    <td>${totalBalance}</td>
                `;
                transactionTable.appendChild(totalRow);

                // Append transaction table to main content
                mainContent.appendChild(transactionTable);

                // Add OK button
                const okButton = document.createElement('button');
                okButton.textContent = 'OK';
                okButton.addEventListener('click', returnToNormalPage);
                mainContent.appendChild(okButton);
            })
            .catch(error => {
                console.error('Error fetching transaction data:', error);
                alert("Failed to fetch transaction data");
            });
    });

    function returnToNormalPage() {
        // Here you can redirect the user back to the normal page
        // For demonstration purposes, I'll just reload the page
        location.reload();
    }

    // Function to hide all forms
    function hideAllForms() {
        const forms = [
            addBankAccountForm,
            depositForm,
            withdrawForm,
            viewTransactionsForm
        ];
        forms.forEach(form => {
            if (form) {
                form.style.display = 'none';
            }
        });
    }

    // Add Bank Account button click listener
    addBankAccountBtn.addEventListener("click", function() {
        // Hide all forms before showing the Add Bank Account form
        hideAllForms();
        addBankAccountForm.style.display = "block";
    });
});

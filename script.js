$(document).ready(function() {
    // Add new course row
    $('.add-course').click(function(e) {
        e.preventDefault();
        const newRow = $('#courseTableBody tr:first').clone();
        newRow.find('input[type="text"]').val('');
        newRow.find('input[type="number"]').val('3');
        newRow.find('select').val('');
        $('#courseTableBody').append(newRow);
    });

    // Delete course row
    $(document).on('click', '.delete-row', function() {
        if ($('#courseTableBody tr').length > 1) {
            $(this).closest('tr').remove();
        } else {
            alert('You must have at least one course!');
        }
    });

    // Array of background images
    const backgroundImages = [
        './monkey/Monkey-Main-1280x720.jpg',
        './monkey/3235.webp'
    ];
    let currentImageIndex = 0;

    // Clear all form fields
    $('.clear').click(function() {
        if (confirm('Are you sure you want to clear all courses?')) {
            $('#courseTableBody tr:not(:first)').remove();
            const firstRow = $('#courseTableBody tr:first');
            firstRow.find('input[type="text"]').val('');
            firstRow.find('input[type="number"]').val('3');
            firstRow.find('select').val('');
            $('.gpa-result').hide();

            // Change background image
            currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
            $('body').css('background-image', `url(${backgroundImages[currentImageIndex]})`);
        }
    });

    // Calculate GPA
    $('.calculate').click(function() {
        let totalPoints = 0;
        let totalCredits = 0;
        let isValid = true;

        $('#courseTableBody tr').each(function() {
            const credits = parseFloat($(this).find('.credits').val());
            const grade = $(this).find('.grade').val();

            if (!grade) {
                alert('Please select a grade for all courses.');
                isValid = false;
                return false; // break the loop
            }

            if (isNaN(credits) || credits <= 0) {
                alert('Please enter valid credits (greater than 0) for all courses.');
                isValid = false;
                return false; // break the loop
            }

            totalPoints += credits * parseFloat(grade);
            totalCredits += credits;
        });

        if (isValid) {
            const gpa = totalPoints / totalCredits;
            $('.gpa-result')
                .html(`Your GPA is: <strong>${gpa.toFixed(2)}</strong>`)
                .show();
        }
    });

    // Input validation for credits
    $(document).on('input', '.credits', function() {
        const value = parseFloat($(this).val());
        if (value < 0) {
            $(this).val(0);
        }
    });

    // Prevent form submission
    $('#gpaForm').submit(function(e) {
        e.preventDefault();
    });
}); 
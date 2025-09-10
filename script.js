// Certificate data for different people
const certificateData = {
    'karthikeya-naik': {
        fullName: 'KARTHIKEYA NAIK',
        course: 'Full Stack Development',
        duration: '01/09/2024 to 30/11/2024',
        url: 'karthikeya-naik'
    },
    'male-manirathnam': {
        fullName: 'MALE MANIRATHNAM',
        course: 'Data Science & Analytics',
        duration: '15/08/2024 to 15/12/2024',
        url: 'male-manirathnam'
    },
    'devasani-vivek': {
        fullName: 'DEVASANI VIVEK',
        course: 'Web Development',
        duration: '15/10/2024 to 01/12/2024',
        url: 'devasani-vivek'
    }
    // Add more certificate data here following the same pattern
    // 'person-name': {
    //     fullName: 'PERSON FULL NAME',
    //     course: 'Course Name',
    //     duration: 'Start Date to End Date',
    //     url: 'person-name'
    // }
};

function getPersonNameFromURL() {
    const path = window.location.pathname;
    let personName = path.substring(1);
    
    if (personName.endsWith('/')) {
        personName = personName.slice(0, -1);
    }
    
    if (!personName || personName === '') {
        return null;
    }
    
    return personName;
}

function showLoading() {
    document.getElementById('certificateContainer').style.display = 'none';
    document.getElementById('errorContainer').style.display = 'none';
    document.getElementById('loadingContainer').style.display = 'block';
}

function loadCertificate() {
    showLoading();
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        const personName = getPersonNameFromURL();
        
        if (!personName) {
            showError();
            return;
        }
        
        const data = certificateData[personName];
        
        if (!data) {
            showError();
            return;
        }
        
        updateCertificateDisplay(data);
        showCertificate();
    }, 500); // 500ms loading delay
}

function updateCertificateDisplay(data) {
    document.getElementById('learnerName').textContent = `– ${data.fullName}`;
    document.getElementById('fullName').textContent = data.fullName;
    document.getElementById('courseName').textContent = data.course;
    document.getElementById('duration').textContent = data.duration;
    
    document.title = `Certificate - ${data.fullName}`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', `AI Verified Certificate for ${data.fullName} - ${data.course} (${data.duration})`);
    }
}

function showCertificate() {
    document.getElementById('loadingContainer').style.display = 'none';
    document.getElementById('errorContainer').style.display = 'none';
    document.getElementById('certificateContainer').style.display = 'block';
    
    addEntranceAnimation();
}

function showError() {
    document.getElementById('loadingContainer').style.display = 'none';
    document.getElementById('certificateContainer').style.display = 'none';
    document.getElementById('errorContainer').style.display = 'block';
    document.title = 'Certificate Not Found';
    
    updateAvailableCertificatesList();
}

function updateAvailableCertificatesList() {
    const listContainer = document.getElementById('availableCertsList');
    if (listContainer) {
        listContainer.innerHTML = '';
        
        Object.keys(certificateData).forEach(key => {
            const data = certificateData[key];
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `/${data.url}`;
            link.textContent = `${data.fullName} - ${data.course}`;
            link.onclick = function(e) {
                e.preventDefault();
                navigateToCertificate(key);
            };
            listItem.appendChild(link);
            listContainer.appendChild(listItem);
        });
    }
}

function addEntranceAnimation() {
    const container = document.getElementById('certificateContainer');
    if (container && container.style.display !== 'none') {
        container.style.opacity = '0';
        container.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            container.style.transition = 'all 0.6s ease';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }
}

window.addEventListener('load', function() {
    loadCertificate();
});

window.addEventListener('popstate', function() {
    loadCertificate();
});

function navigateToCertificate(personName) {
    const data = certificateData[personName];
    if (data) {
        window.history.pushState({}, '', `/${data.url}`);
        loadCertificate();
    } else {
        console.error(`Certificate not found for: ${personName}`);
    }
}

// Export functions for external use
window.CertificateManager = {
    navigateTo: navigateToCertificate,
    getAll: () => Object.keys(certificateData).map(key => ({
        key: key,
        ...certificateData[key]
    })),
    generateURL: (personKey, baseURL = '') => {
        const data = certificateData[personKey];
        return data ? `${baseURL}/${data.url}` : null;
    }
};

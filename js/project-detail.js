// Extended project data with full details
const projectsDetailData = {
    'the-last-horizon': {
        id: 'the-last-horizon',
        title: 'The Last Horizon',
        client: 'Netflix',
        category: 'Feature Film',
        year: '2024',
        videoUrl: 'https://player.vimeo.com/video/76979871?autoplay=1',
        thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop',
        description: 'An epic journey across uncharted territories, exploring the boundaries of human resilience and the power of hope in the face of adversity.',
        challenge: 'The client wanted to create a visually stunning narrative that would resonate with global audiences while maintaining authentic storytelling. The challenge was to balance commercial appeal with artistic integrity, shooting in remote locations with limited resources.',
        solution: 'We assembled a world-class crew and spent six months in pre-production, carefully planning every shot. Our approach combined traditional filmmaking techniques with cutting-edge drone cinematography and practical effects. We worked closely with local communities to ensure authentic representation.',
        results: 'The film premiered at Sundance Film Festival, garnering critical acclaim and winning three awards. It was subsequently acquired by Netflix for global distribution, reaching audiences in over 190 countries. The project established our reputation for delivering cinema-quality content.',
        gallery: [
            'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop'
        ]
    },
    'urban-chronicles': {
        id: 'urban-chronicles',
        title: 'Urban Chronicles',
        client: 'Vice Media',
        category: 'Documentary Series',
        year: '2024',
        videoUrl: 'https://player.vimeo.com/video/76979871?autoplay=1',
        thumbnail: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=1200&h=800&fit=crop',
        description: 'A raw and intimate look at urban life across five major cities, exploring the intersection of culture, art, and social change.',
        challenge: 'Capturing authentic stories in fast-paced urban environments while maintaining visual consistency across different cities and cultures. The challenge was to create a cohesive narrative that honored each city\'s unique character.',
        solution: 'We developed a documentary approach that prioritized human connection over technical perfection. Our small, agile team spent weeks embedded in local communities, building trust and capturing unscripted moments. We used a mix of handheld cinema cameras and mobile devices to maintain intimacy.',
        results: 'The series was Vice Media\'s most-watched documentary of the year, generating over 10 million views across platforms. It sparked important conversations about urban development and cultural preservation, winning the Documentary Excellence Award.',
        gallery: [
            'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1200&h=800&fit=crop'
        ]
    },
    'velocity': {
        id: 'velocity',
        title: 'Velocity',
        client: 'Nike',
        category: 'Commercial',
        year: '2025',
        videoUrl: 'https://player.vimeo.com/video/76979871?autoplay=1',
        thumbnail: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&h=800&fit=crop',
        description: 'A high-energy commercial celebrating athletic excellence and the relentless pursuit of speed, featuring world-class athletes pushing their limits.',
        challenge: 'Creating dynamic, fast-paced content that captures the essence of speed while showcasing Nike\'s latest performance footwear. The tight deadline required flawless execution and innovative camera techniques.',
        solution: 'We utilized high-speed cameras, motion control rigs, and creative lighting to create stunning slow-motion sequences. Our team coordinated with professional athletes to capture authentic moments of intensity and triumph, combining practical stunts with minimal post-production.',
        results: 'The campaign generated over 50 million impressions in the first week, becoming Nike\'s most successful product launch of the quarter. Sales exceeded projections by 200%, and the commercial won Gold at the Cannes Lions International Festival.',
        gallery: [
            'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop',
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&h=800&fit=crop'
        ]
    }
    // Add more projects as needed
};

// Get project ID from URL parameter
function getProjectId() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('project') || 'the-last-horizon';
}

// Load project details
function loadProjectDetails() {
    const projectId = getProjectId();
    const project = projectsDetailData[projectId];

    if (!project) {
        window.location.href = 'work.html';
        return;
    }

    // Update page title
    document.title = `${project.title} - FOB Media`;

    // Load video/image
    const videoContainer = document.getElementById('projectVideo');
    if (project.videoUrl) {
        videoContainer.innerHTML = `
            <img src="${project.thumbnail}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
            <div class="play-button" onclick="playVideo('${project.videoUrl}')"></div>
        `;
    } else {
        videoContainer.innerHTML = `<img src="${project.thumbnail}" alt="${project.title}">`;
    }

    // Update project info
    document.getElementById('projectClient').textContent = project.client;
    document.getElementById('projectCategory').textContent = project.category;
    document.getElementById('projectYear').textContent = project.year;
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectDescription').innerHTML = `<p>${project.description}</p>`;

    // Update sections
    document.getElementById('projectChallenge').innerHTML = `<p>${project.challenge}</p>`;
    document.getElementById('projectSolution').innerHTML = `<p>${project.solution}</p>`;
    document.getElementById('projectResults').innerHTML = `<p>${project.results}</p>`;

    // Load gallery
    const gallery = document.getElementById('projectGallery');
    if (project.gallery && project.gallery.length > 0) {
        gallery.innerHTML = project.gallery.map(img => `
            <div class="gallery-item">
                <img src="${img}" alt="${project.title}">
            </div>
        `).join('');
    }

    // Setup navigation to other projects
    setupProjectNavigation(projectId);
}

// Play video in fullscreen or modal
function playVideo(videoUrl) {
    const videoContainer = document.getElementById('projectVideo');
    videoContainer.innerHTML = `
        <iframe src="${videoUrl}" 
                width="100%" 
                height="100%" 
                frameborder="0" 
                allow="autoplay; fullscreen; picture-in-picture" 
                allowfullscreen>
        </iframe>
    `;
}

// Setup next/previous project navigation
function setupProjectNavigation(currentProjectId) {
    const projectIds = Object.keys(projectsDetailData);
    const currentIndex = projectIds.indexOf(currentProjectId);
    
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : projectIds.length - 1;
    const nextIndex = currentIndex < projectIds.length - 1 ? currentIndex + 1 : 0;

    const prevProject = projectsDetailData[projectIds[prevIndex]];
    const nextProject = projectsDetailData[projectIds[nextIndex]];

    // Update previous project link
    const prevLink = document.getElementById('prevProject');
    prevLink.href = `project-detail.html?project=${prevProject.id}`;
    prevLink.querySelector('.nav-title').textContent = prevProject.title;

    // Update next project link
    const nextLink = document.getElementById('nextProject');
    nextLink.href = `project-detail.html?project=${nextProject.id}`;
    nextLink.querySelector('.nav-title').textContent = nextProject.title;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadProjectDetails);
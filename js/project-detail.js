// Fetch single project by slug
async function fetchProject(slug) {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('slug', slug)
            .single();
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

// Fetch all projects for navigation
async function fetchAllProjects() {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('slug, title')
            .order('order_index', { ascending: true });
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

function getProjectSlug() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('project');
}

async function loadProjectDetails() {
    const slug = getProjectSlug();
    
    if (!slug) {
        window.location.href = 'work.html';
        return;
    }
    
    const project = await fetchProject(slug);
    
    if (!project) {
        window.location.href = 'work.html';
        return;
    }
    
    document.title = `${project.title} - BOLD UNITY CREATIVE`;
    
    const videoContainer = document.getElementById('projectVideo');
    if (project.video_url) {
        videoContainer.innerHTML = `
            <img src="${project.thumbnail_url}" alt="${project.title}" style="width: 100%; height: 100%; object-fit: cover;">
            <div class="play-button" onclick="playVideo('${project.video_url}')"></div>
        `;
    } else {
        videoContainer.innerHTML = `<img src="${project.thumbnail_url}" alt="${project.title}">`;
    }
    
    document.getElementById('projectClient').textContent = project.client;
    document.getElementById('projectCategory').textContent = project.category;
    document.getElementById('projectYear').textContent = project.year;
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectDescription').innerHTML = `<p>${project.description}</p>`;
    
    if (project.challenge) {
        document.getElementById('projectChallenge').innerHTML = `<p>${project.challenge}</p>`;
    }
    
    if (project.solution) {
        document.getElementById('projectSolution').innerHTML = `<p>${project.solution}</p>`;
    }
    
    if (project.results) {
        document.getElementById('projectResults').innerHTML = `<p>${project.results}</p>`;
    }
    
    const gallery = document.getElementById('projectGallery');
    if (project.gallery && project.gallery.length > 0) {
        gallery.innerHTML = project.gallery.map(img => `
            <div class="gallery-item">
                <img src="${img}" alt="${project.title}">
            </div>
        `).join('');
    }
    
    await setupProjectNavigation(slug);
}

function playVideo(videoUrl) {
    const videoContainer = document.getElementById('projectVideo');
    videoContainer.innerHTML = `
        <iframe src="${videoUrl}?autoplay=1" 
                width="100%" 
                height="100%" 
                frameborder="0" 
                allow="autoplay; fullscreen" 
                allowfullscreen>
        </iframe>
    `;
}

async function setupProjectNavigation(currentSlug) {
    const projects = await fetchAllProjects();
    const currentIndex = projects.findIndex(p => p.slug === currentSlug);
    
    if (currentIndex === -1) return;
    
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    const nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
    
    const prevProject = projects[prevIndex];
    const nextProject = projects[nextIndex];
    
    const prevLink = document.getElementById('prevProject');
    prevLink.href = `project-detail.html?project=${prevProject.slug}`;
    prevLink.querySelector('.nav-title').textContent = prevProject.title;
    
    const nextLink = document.getElementById('nextProject');
    nextLink.href = `project-detail.html?project=${nextProject.slug}`;
    nextLink.querySelector('.nav-title').textContent = nextProject.title;
}

document.addEventListener('DOMContentLoaded', loadProjectDetails);

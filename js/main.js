// Fetch projects from the bundled data file.
async function fetchProjects() {
    if (window.FOBData) {
        const data = await window.FOBData.load();
        if (data) return window.FOBData.getProjects();
    }

    return [];
}

// Fetch featured projects from the bundled data file.
async function fetchFeaturedProjects() {
    if (window.FOBData) {
        const data = await window.FOBData.load();
        if (data) return window.FOBData.getFeaturedProjects();
    }

    return [];
}

// Create project card HTML
function createProjectCard(project) {
    const href = project.slug
        ? `project-detail.html?project=${project.slug}`
        : `project-detail.html?id=${project.id}`;
    const image = project.thumbnail_url || project.image_fallback || project.image || '';

    return `
        <a href="${href}" class="work-card">
            <img src="${image}" alt="${project.title}">
            <div class="work-overlay">
                <div class="work-client">${project.client}</div>
                <div class="work-title">${project.title}</div>
            </div>
        </a>
    `;
}

// Initialize work grid
async function initWorkGrid() {
    const workGrid = document.getElementById('workGrid');
    if (!workGrid) return;
    
    workGrid.innerHTML = '<div style="text-align: center; padding: 60px;">Loading projects...</div>';
    
    const projects = await fetchProjects();
    
    if (projects.length === 0) {
        workGrid.innerHTML = '<div style="text-align: center; padding: 60px;">No projects found.</div>';
        return;
    }
    
    // Duplicate for seamless scrolling
    const duplicatedProjects = [...projects, ...projects];
    workGrid.innerHTML = duplicatedProjects.map(createProjectCard).join('');
}

// Initialize featured grid
async function initFeaturedGrid() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    
    featuredGrid.innerHTML = '<div style="text-align: center; padding: 60px;">Loading featured projects...</div>';
    
    const projects = await fetchFeaturedProjects();
    
    if (projects.length === 0) {
        featuredGrid.innerHTML = '';
        return;
    }
    
    featuredGrid.innerHTML = projects.map(createProjectCard).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initWorkGrid();
    initFeaturedGrid();
});

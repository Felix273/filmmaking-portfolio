// Fetch projects from Supabase
async function fetchProjects() {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('order_index', { ascending: true });
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

// Fetch featured projects
async function fetchFeaturedProjects() {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('featured', true)
            .order('order_index', { ascending: true });
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Error fetching featured projects:', error);
        return [];
    }
}

// Create project card HTML
function createProjectCard(project) {
    return `
        <a href="project-detail.html?project=${project.slug}" class="work-card">
            <img src="${project.thumbnail_url}" alt="${project.title}">
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

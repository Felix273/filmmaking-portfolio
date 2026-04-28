// Projects data
const projectsData = [
    { title: 'The Last Horizon', client: 'Feature Film', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop' },
    { title: 'Urban Chronicles', client: 'Documentary Series', image: 'https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=800&h=600&fit=crop' },
    { title: 'Velocity', client: 'Nike Commercial', image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&h=600&fit=crop' },
    { title: 'Silent Waters', client: 'Short Film', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop' },
    { title: 'Future Forward', client: 'Apple Brand Film', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&h=600&fit=crop' },
    { title: 'Neon Dreams', client: 'Music Video', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop' },
    { title: 'Breaking Barriers', client: 'Nike Women', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop' },
    { title: 'Midnight Run', client: 'Adidas', image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop' },
    { title: 'Golden Hour', client: 'Tourism Campaign', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop' },
    { title: 'Electric Dreams', client: 'Tesla', image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop' },
    { title: 'Ocean Deep', client: 'Conservation Doc', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop' },
    { title: 'City Lights', client: 'Urban Series', image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop' },
];

const featuredProjectsData = [
    { title: 'Brand Revolution', client: 'Apple', image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=600&fit=crop' },
    { title: 'Cinematic Journey', client: 'Netflix', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=600&fit=crop' },
    { title: 'Urban Stories', client: 'Vice Media', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=600&fit=crop' },
    { title: 'Sound & Vision', client: 'Spotify', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop' },
    { title: 'The Collection', client: 'Nike', image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&h=600&fit=crop' },
    { title: 'Endless Summer', client: 'Tourism Board', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop' },
];

// Function to create project card
function createProjectCard(project) {
    return `
        <div class="work-card">
            <img src="${project.image}" alt="${project.title}">
            <div class="work-overlay">
                <div class="work-client">${project.client}</div>
                <div class="work-title">${project.title}</div>
            </div>
        </div>
    `;
}

// Generate work grid on homepage - DUPLICATE for seamless scroll
function initWorkGrid() {
    const workGrid = document.getElementById('workGrid');
    if (workGrid) {
        // Duplicate projects 2 times for seamless infinite scroll
        const duplicatedProjects = [...projectsData, ...projectsData];
        workGrid.innerHTML = duplicatedProjects.map(createProjectCard).join('');
    }
}

// Generate featured grid
function initFeaturedGrid() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (featuredGrid) {
        featuredGrid.innerHTML = featuredProjectsData.map(createProjectCard).join('');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initWorkGrid();
    initFeaturedGrid();
});

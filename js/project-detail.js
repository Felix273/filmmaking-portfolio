(function () {
    'use strict';

    function getProjectParam() {
        var params = new URLSearchParams(window.location.search);
        return params.get('id') || params.get('project');
    }

    function slugify(value) {
        return String(value || '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    }

    function imageFor(entry) {
        return (entry && (entry.image_fallback || entry.image || entry.thumbnail_url)) || '';
    }

    function findProject(projects, key) {
        if (!key) return null;
        return projects.find(function (project) {
            return project.id === key || project.slug === key || slugify(project.title) === key;
        }) || null;
    }

    function findProjectVideo(videos, projectId) {
        return videos.find(function (video) {
            return video.project_id === projectId;
        }) || null;
    }

    function setText(id, value) {
        var el = document.getElementById(id);
        if (el) el.textContent = value || '';
    }

    function setHTML(id, value) {
        var el = document.getElementById(id);
        if (el) el.innerHTML = value || '';
    }

    function loadData() {
        return fetch('assets/data/projects.json')
            .then(function (response) {
                if (!response.ok) throw new Error('Could not load project data');
                return response.json();
            });
    }

    function playVideo(embedUrl) {
        var videoContainer = document.getElementById('projectVideo');
        if (!videoContainer || !embedUrl) return;
        var separator = embedUrl.indexOf('?') === -1 ? '?' : '&';
        videoContainer.innerHTML = [
            '<iframe src="', embedUrl, separator, 'autoplay=1&title=0&byline=0&portrait=0"',
            ' width="100%" height="100%" frameborder="0"',
            ' allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>'
        ].join('');
    }

    function renderHero(project, video) {
        var videoContainer = document.getElementById('projectVideo');
        if (!videoContainer) return;

        var embedUrl = project.video_url || (video && video.embed_url);
        videoContainer.innerHTML = [
            '<img src="', imageFor(project), '" alt="', project.title, '">',
            embedUrl ? '<button class="play-button" type="button" aria-label="Play project video"></button>' : ''
        ].join('');

        var playButton = videoContainer.querySelector('.play-button');
        if (playButton) {
            playButton.addEventListener('click', function () {
                playVideo(embedUrl);
            });
        }
    }

    function renderGallery(project) {
        var gallery = document.getElementById('projectGallery');
        if (!gallery) return;

        var images = project.gallery && project.gallery.length ? project.gallery : [
            imageFor(project),
            project.image_fallback,
            project.image_fallback
        ].filter(Boolean);

        gallery.innerHTML = images.map(function (src) {
            return [
                '<div class="gallery-item">',
                    '<img src="', src, '" alt="', project.title, '" loading="lazy">',
                '</div>'
            ].join('');
        }).join('');
    }

    function renderNavigation(projects, currentProject) {
        var currentIndex = projects.findIndex(function (project) {
            return project.id === currentProject.id;
        });
        if (currentIndex === -1) return;

        var prevProject = projects[currentIndex > 0 ? currentIndex - 1 : projects.length - 1];
        var nextProject = projects[currentIndex < projects.length - 1 ? currentIndex + 1 : 0];
        var prevLink = document.getElementById('prevProject');
        var nextLink = document.getElementById('nextProject');

        if (prevLink) {
            prevLink.href = 'project-detail.html?id=' + prevProject.id;
            prevLink.querySelector('.nav-title').textContent = prevProject.title;
        }
        if (nextLink) {
            nextLink.href = 'project-detail.html?id=' + nextProject.id;
            nextLink.querySelector('.nav-title').textContent = nextProject.title;
        }
    }

    function renderProject(data, project) {
        var video = findProjectVideo(data.videos || [], project.id);
        document.title = project.title + ' — BOLD UNITY CREATIVE';

        renderHero(project, video);
        setText('projectClient', project.client);
        setText('projectCategory', project.type || project.category);
        setText('projectYear', project.year);
        setText('projectTitle', project.title);
        setHTML('projectDescription', '<p>' + project.description + '</p>');

        setHTML('projectChallenge', '<p>' + (project.challenge || 'The brief called for a piece that could carry emotional weight while still landing clearly for its intended audience.') + '</p>');
        setHTML('projectSolution', '<p>' + (project.solution || 'We built the visual language around rhythm, texture, and restraint, shaping each scene to serve the central feeling of the story.') + '</p>');
        setHTML('projectResults', '<p>' + (project.results || 'The finished work gives the project a focused cinematic identity and a flexible set of assets for campaign, festival, and digital use.') + '</p>');

        renderGallery(project);
        renderNavigation(data.projects || [], project);
    }

    function showMissingProject() {
        var container = document.querySelector('.project-detail-container');
        if (!container) return;
        container.innerHTML = [
            '<section class="project-info">',
                '<h1 class="project-title">Project Not Found</h1>',
                '<div class="project-description"><p>The project link could not be matched to the current archive.</p></div>',
                '<p><a href="work.html" style="color:#fff;">Back to work</a></p>',
            '</section>'
        ].join('');
    }

    document.addEventListener('DOMContentLoaded', function () {
        var key = getProjectParam();
        if (!key) {
            showMissingProject();
            return;
        }

        loadData()
            .then(function (data) {
                var project = findProject(data.projects || [], key);
                if (!project) {
                    showMissingProject();
                    return;
                }
                renderProject(data, project);
            })
            .catch(function () {
                showMissingProject();
            });
    });
}());

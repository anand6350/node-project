const deletebutton = document.querySelectorAll('.delete-btn');
    deletebutton.forEach(button => {
        button.addEventListener('click', e => {
        const blogid = button.dataset.id;
        const endpoint = `/blogs/${blogid}`;

        fetch(endpoint, {
            method: 'DELETE'
        }).then(res => res.json())
        .then(data => {
            window.location.href = data.redirect;
        }).catch(err => console.log(err));
    });
});

document.querySelector('.detail-delete-btn').addEventListener('click', e => {
    const blogid = e.currentTarget.dataset.id;
    fetch(`/blogs/${blogid}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err));
});
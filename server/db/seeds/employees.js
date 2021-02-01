exports.seed = function(knex) {
  return knex('employee').del()
    .then(function () {
      return knex('employee').insert([
        {id: 1, first_name: 'john', last_name: 'doe', email: 'johndoe@work.com', gender: 'male', mobile: '8762340193', image_url: 'https://randomuser.me/api/portraits/men/34.jpg', department:'HR', job_profile: 'HR Manager', salary: 282396},
        {id: 2, first_name: 'frank', last_name: 'stein', email: 'frankstein@gmail.com', gender: 'male', mobile: '9110034562', image_url: 'https://randomuser.me/api/portraits/men/43.jpg', department:'Sales', job_profile: 'Sales Person', salary: 349023},
        {id: 3, first_name: 'gina', last_name: 'castle', email: 'castlegina@yahoo.com', gender: 'female', mobile: '7910456238', image_url: 'https://randomuser.me/api/portraits/women/35.jpg', department:'Accounts', job_profile: 'Junior Accountant', salary: 345678},
        {id: 4, first_name: 'alicia', last_name: 'smith', email: 'aliciasmith@gmail.com', gender: 'female', mobile: '8765401236', image_url: 'https://randomuser.me/api/portraits/women/22.jpg', department:'IT', job_profile: 'Network Admin', salary: 285696},
        {id: 5, first_name: 'elliot', last_name: 'jones', email: 'adamjones@gmail.com', gender: 'male', mobile: '9876543021', image_url: 'https://randomuser.me/api/portraits/men/44.jpg', department:'Software', job_profile: 'React Developer', salary: 282396},
        {id: 6, first_name: 'karen', last_name: 'rawlins', email: 'karenrawlins@gmail.com', gender: 'female', mobile: '791023456', image_url: 'https://randomuser.me/api/portraits/women/57.jpg', department:'Software', job_profile: 'Tech Lead', salary: 586396}
      ]);
    });
};

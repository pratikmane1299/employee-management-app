exports.seed = function(knex) {
  return knex('employee').del()
    .then(function () {
      return knex('employee').insert([
        {id: "7ef3ef21-91df-4548-9212-48184a45a765", first_name: 'john', last_name: 'doe', email: 'johndoe@work.com', gender: 'male', mobile: '8762340193', image_url: 'https://randomuser.me/api/portraits/men/34.jpg', department:'HR', job_profile: 'HR Manager', salary: 282396},
        {id: "067242d2-f7b4-474c-a0d6-0e0d77b2e9ed", first_name: 'frank', last_name: 'stein', email: 'frankstein@gmail.com', gender: 'male', mobile: '9110034562', image_url: 'https://randomuser.me/api/portraits/men/43.jpg', department:'Sales', job_profile: 'Sales Person', salary: 349023},
        {id: "3ea245cd-b059-4b71-a300-b594b660d6b4", first_name: 'gina', last_name: 'castle', email: 'castlegina@yahoo.com', gender: 'female', mobile: '7910456238', image_url: 'https://randomuser.me/api/portraits/women/35.jpg', department:'Accounts', job_profile: 'Junior Accountant', salary: 345678},
        {id: "35ea0cf5-8a8f-44b4-83ce-cf5ce09072ea", first_name: 'alicia', last_name: 'smith', email: 'aliciasmith@gmail.com', gender: 'female', mobile: '8765401236', image_url: 'https://randomuser.me/api/portraits/women/22.jpg', department:'IT', job_profile: 'Network Admin', salary: 285696},
        {id: "00bb1876-8b25-42fd-977b-3d5b2a4c38fe", first_name: 'elliot', last_name: 'jones', email: 'adamjones@gmail.com', gender: 'male', mobile: '9876543021', image_url: 'https://randomuser.me/api/portraits/men/44.jpg', department:'Software', job_profile: 'React Developer', salary: 282396},
        {id: "b1b2f8ff-06c9-487f-bbea-f422d103cfb5", first_name: 'karen', last_name: 'rawlins', email: 'karenrawlins@gmail.com', gender: 'female', mobile: '791023456', image_url: 'https://randomuser.me/api/portraits/women/57.jpg', department:'Software', job_profile: 'Tech Lead', salary: 586396}
      ]);
    });
};

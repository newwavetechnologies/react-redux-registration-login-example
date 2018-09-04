

    
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {

            setTimeout(() => {


                if (url.endsWith('/users') && opts.method === 'GET') {
                    let users = JSON.parse(localStorage.getItem('users')) || [];
                    if(users && users.length > 1  ){
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                    }else{
                        var user1 ={
                            email: 'testUser1@newwave.io',
                            firstName: 'User1',
                            lastName: 'test',
                            regCode:'123456',
                            registered : 'TEMP'
                        };
                        var user2 ={
                            email: 'testUser2@newwave.io',
                            firstName: 'User2',
                            lastName: 'test',
                            regCode:'',
                            registered : 'PATIENT'
                        };
                        users.push(user1);
                        users.push(user2);
                        localStorage.setItem('users', JSON.stringify(users));
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                    }
                   
                    return;
                }

                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}
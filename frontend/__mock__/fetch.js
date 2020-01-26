export default function() {
    return Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 0,
            Task: 'Wash the dishes'
          },
          {
            id: 1,
            Task: 'Make the bed'
          }
        ])
   
    })
  }
export const getSequences = async (userId) => {
  return new Promise((resolve, reject) => {
    window.db
      .ref(`users/${userId}/sequences`)
      .get()
      .then((data) => {
        if (!data.val()) {
          resolve([]);
        }
        const sequences = Object.entries(data.val()).map(([key, value]) => {
          const obj = value;
          const durationInSeconds = obj.actions
            .map((action) => action.duration)
            .reduce((a, b) => a + b, 0);
          const minutes = `${Math.floor(durationInSeconds / 60)}`.padStart(
            2,
            0
          );
          const seconds = `${durationInSeconds - minutes * 60}`.padStart(2, 0);
          const duration = `${minutes}:${seconds}`;
          value.id = key;
          value.duration = duration;
          return obj;
        });
        const sortedSequences = sequences.sort((a, b) => {
          const nameA = a.title.toUpperCase();
          const nameB = b.title.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
        resolve(sortedSequences);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

// TODO does this need to return something?
export const postSequence = (userId, sequence, sequenceId) => {
  if (typeof userId !== "string" || typeof sequence !== "object") {
    throw new Error("Arguments not correct type");
  }
  if (sequenceId) {
    const sequenceListRef = window.db.ref(
      
      
      `users/${userId}/sequences/${sequenceId}`
    
    
    );
    sequenceListRef.set(sequence);
  } else {
    const sequenceListRef = window.db.ref(`users/${userId}/sequences/`);
    const newSequenceRef = sequenceListRef.push();
    newSequenceRef.set(sequence);
  }
};

export const postUser = (userId, email) =>
  window.db.ref(`users/${userId}`).set({ email });

export const getSequence = (userId, sequenceId) =>
  new Promise((resolve, reject) => {
    window.db
      .ref(`users/${userId}/sequences/${sequenceId}`)
      .get()
      .then((data) => {
        resolve(data.val());
      })
      .catch((error) => {
        reject(error);
      });
  });

export const deleteSequence = (userId, sequenceId) =>
  window.db.ref(`users/${userId}/sequences/${sequenceId}`).remove();

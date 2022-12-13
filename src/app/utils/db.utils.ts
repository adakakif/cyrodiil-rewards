export function convertSnaps<T> (results: any) {
    return <T[]>results.docs.map((snap: any) => {
        return {
            id: snap.id,
            ...<any>snap.data()
        }
    })
}

export function convertSnapsChanges<T> (results: any) {
    return <T[]>results.map((snap: any) => {
            return {
                id: snap.payload.doc.id,
                ...<any>snap.payload.doc.data()
            };
        }
    )
}


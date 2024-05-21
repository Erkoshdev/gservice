export default function (err) {
    if (err.toString().indexOf('ChunkLoadError') >= 0) {
        window.location.reload();
    }
}
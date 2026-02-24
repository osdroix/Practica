                    // Leer el texto desde un atributo data en el elemento objetivo
                    function typeWriter(el = document.getElementById("typewriter")) {
                        if (!el) return;
                        const text = el.dataset.text || "";
                        let i = 0;
                        const speed = 80; // milisegundos por carácter

                        function write() {
                            if (i < text.length) {
                                el.textContent += text.charAt(i);
                                i++;
                                setTimeout(write, speed);
                            }
                        }
                        write();
                    }

                    window.addEventListener('DOMContentLoaded', () => {
                        typeWriter();
                    });

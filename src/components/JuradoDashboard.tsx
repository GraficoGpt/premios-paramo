import { auth, db } from '../lib/firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export default function JuradoDashboard() {
  const [jurado, setJurado] = useState<any>(null);
  const [proyectos, setProyectos] = useState<any[]>([]);
  const [votaciones, setVotaciones] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (!user || !user.email) return;

        // Datos del jurado
        const juradoRef = doc(db, 'jurados', user.email);
        const juradoSnap = await getDoc(juradoRef);
        if (!juradoSnap.exists()) {
          setLoading(false);
          return;
        }
        const juradoData = juradoSnap.data();
        setJurado(juradoData);

        // Proyectos por categoría
        const proyectosSnap = await getDocs(
          query(collection(db, 'proyectos'), where('categoria', 'in', juradoData.categorias))
        );
        const proyectosLista = proyectosSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setProyectos(proyectosLista);

        // Votaciones del jurado actual
        const votosSnap = await getDocs(
          query(collection(db, 'votaciones'), where('juradoEmail', '==', user.email))
        );
        const votos = votosSnap.docs.reduce((acc, doc) => {
          const data = doc.data();
          acc[data.proyectoId] = data.promedio;
          return acc;
        }, {} as Record<string, number>);
        setVotaciones(votos);

        setLoading(false);
      });
    };

    cargarDatos();
  }, []);

  if (loading) return <p>Cargando panel del jurado...</p>;
  if (!jurado) return <p className="text-red-600">⚠️ Jurado no encontrado en Firestore.</p>;

  return (
    <div className="space-y-6">
      <div className="bg-gray-100 p-4 rounded shadow">
        <p className="text-lg font-semibold">👤 Jurado: {jurado.nombre}</p>
        <p className="text-sm text-gray-600">📧 {jurado.email}</p>
        <p className="text-sm">🎯 Categorías: {jurado.categorias.join(', ')}</p>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Proyectos para calificar:</h2>
        {proyectos.length === 0 ? (
          <p>No hay proyectos en tus categorías.</p>
        ) : (
          <ul className="space-y-4">
            {proyectos.map((p) => (
              <li key={p.id} className="border p-4 rounded shadow">
                <h3 className="text-lg font-bold">{p.nombreProyecto}</h3>
                <p><strong>Postulante:</strong> {p.nombrePostulante}</p>
                <p><strong>Categoría:</strong> {p.categoria}</p>
                <a
                  href={`/jurado/${p.id}`}
                  className="text-blue-600 hover:underline block mt-1"
                >
                  Ver ficha del proyecto →
                </a>

                {votaciones[p.id] !== undefined ? (
                  <p className="text-green-700 mt-2">
                    ✅ Calificado — Promedio: <strong>{votaciones[p.id]}</strong>
                  </p>
                ) : (
                  <p className="text-yellow-600 mt-2">🕒 Sin calificar</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

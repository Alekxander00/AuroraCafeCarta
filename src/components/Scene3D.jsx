import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Box3, DoubleSide, Mesh, MeshStandardMaterial, Vector3 } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

function StageLights() {
  return (
    <>
      <ambientLight intensity={0.76} color="#f3e5ce" />
      <directionalLight
        castShadow
        intensity={1.5}
        color="#ffe4c0"
        position={[4.5, 6, 4.5]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight intensity={0.86} color="#c59759" position={[-4, 1.5, 3.5]} />
    </>
  )
}

function FloatRig({ item }) {
  const groupRef = useRef(null)

  useFrame((state) => {
    const group = groupRef.current
    if (!group) {
      return
    }

    const time = state.clock.elapsedTime * (item.speed ?? 1)
    const drift = item.drift ?? 0.12

    group.position.x = item.position[0] + Math.cos(time * 0.7) * drift * 0.3
    group.position.y = item.position[1] + Math.sin(time) * drift
    group.position.z = item.position[2] + Math.sin(time * 0.6) * drift * 0.18
    group.rotation.x = item.rotation[0] + Math.sin(time * 0.5) * 0.04
    group.rotation.y = item.rotation[1] + Math.cos(time * 0.45) * 0.22
    group.rotation.z = item.rotation[2] + Math.sin(time * 0.55) * 0.04
  })

  return (
    <group ref={groupRef} position={item.position} rotation={item.rotation}>
      <StylizedModel item={item} />
    </group>
  )
}

function StylizedModel({ item }) {
  const object = useLoader(FBXLoader, item.src)
  const fittedRef = useRef(null)

  useEffect(() => {
    const fitted = fittedRef.current
    if (!fitted) {
      return
    }

    fitted.clear()
    object.updateMatrixWorld(true)

    let sourceMesh = null
    object.traverse((child) => {
      if (!sourceMesh && child.isMesh) {
        sourceMesh = child
      }
    })

    if (!sourceMesh) {
      return undefined
    }

    sourceMesh.updateMatrixWorld(true)

    const geometry = sourceMesh.geometry.clone()
    geometry.applyMatrix4(sourceMesh.matrixWorld)

    const bounds = new Box3().setFromBufferAttribute(geometry.attributes.position)
    const size = new Vector3()
    const center = new Vector3()
    bounds.getSize(size)
    bounds.getCenter(center)
    geometry.translate(-center.x, -center.y, -center.z)

    const fit = item.fit ?? 2.4
    const maxAxis = Math.max(size.x, size.y, size.z) || 1
    const scale = fit / maxAxis

    const material = new MeshStandardMaterial({
      color: item.color ?? '#d8c099',
      emissive: item.color ?? '#d8c099',
      emissiveIntensity: 0.08,
      metalness: item.metalness ?? 0.08,
      roughness: item.roughness ?? 0.68,
      side: DoubleSide,
    })

    const mesh = new Mesh(geometry, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.frustumCulled = false
    mesh.scale.setScalar(scale)
    mesh.position.y -= size.y * scale * 0.12
    fitted.add(mesh)

    return () => {
      fitted.clear()
      geometry.dispose()
      material.dispose()
    }
  }, [item.color, item.fit, item.metalness, item.roughness, object])

  return <group ref={fittedRef} />
}

function StageFloor() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]} receiveShadow>
        <circleGeometry args={[4.25, 64]} />
        <meshStandardMaterial color="#132019" roughness={1} />
      </mesh>
      <mesh position={[0, 1.55, -2.4]}>
        <circleGeometry args={[3.2, 64]} />
        <meshStandardMaterial color="#274233" roughness={1} transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[-0.18, 0, 0]} position={[0, 0.55, -2.6]}>
        <circleGeometry args={[2.7, 64]} />
        <meshStandardMaterial color="#3b5a46" roughness={1} transparent opacity={0.28} />
      </mesh>
    </>
  )
}

function AccentBeans() {
  return (
    <>
      <mesh position={[-1.7, 1.2, 0.55]} rotation={[0.2, 0.4, 0.2]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color="#c59759" roughness={0.5} metalness={0.12} />
      </mesh>
      <mesh position={[1.62, 1.55, -0.22]} rotation={[0.3, 0.2, -0.18]}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshStandardMaterial color="#d8c099" roughness={0.46} metalness={0.12} />
      </mesh>
    </>
  )
}

export function Scene3D({ scene }) {
  return (
    <div className="scene3d-shell" aria-hidden="true">
      <Canvas camera={{ position: [0, 1.15, 5.3], fov: 28 }} dpr={[1, 1.75]} shadows>
        <StageLights />
        {scene.items.map((item) => (
          <FloatRig key={item.src} item={item} />
        ))}
        <AccentBeans />
        <StageFloor />
      </Canvas>
    </div>
  )
}

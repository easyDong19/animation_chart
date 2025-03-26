import React, { useEffect, useRef } from 'react';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkHttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';

export default function VTKViewer() {
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. 렌더링 창 생성
    const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
      rootContainer: containerRef.current,
      background: [0.1, 0.1, 0.1],
    });
    const renderer = fullScreenRenderer.getRenderer();
    const renderWindow = fullScreenRenderer.getRenderWindow();

    // 2. Reader 생성 및 로딩
    const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: false });
    reader.setUrl('/egg.vtk').then(() => {
      reader.loadData().then(() => {
        const data = reader.getOutputData();

        // 3. Mapper + Actor 설정
        const mapper = vtkMapper.newInstance();
        mapper.setInputData(data);

        const actor = vtkActor.newInstance();
        actor.setMapper(mapper);

        renderer.addActor(actor);
        renderer.resetCamera();
        renderWindow.render();
      });
    });

    // 클린업
    return () => {
      fullScreenRenderer.delete();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100vh' }} />;
}
